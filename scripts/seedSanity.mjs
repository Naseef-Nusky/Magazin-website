/**
 * Seed Sanity with demo categories, authors, and articles.
 * Usage: node scripts/seedSanity.mjs
 */
import { createClient } from '@sanity/client'
import { readFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { articles, authors, categories } from '../src/data/demoArticles.js'

function loadEnv() {
  try {
    const raw = readFileSync(new URL('../.env', import.meta.url), 'utf8')
    for (const line of raw.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const i = trimmed.indexOf('=')
      if (i === -1) continue
      const key = trimmed.slice(0, i)
      const value = trimmed.slice(i + 1)
      if (!process.env[key]) process.env[key] = value
    }
  } catch {
    // optional
  }
}

function loadAuthToken() {
  if (process.env.SANITY_API_TOKEN) return process.env.SANITY_API_TOKEN
  try {
    const cfg = JSON.parse(
      readFileSync(join(homedir(), '.config/sanity/config.json'), 'utf8'),
    )
    return cfg.authToken
  } catch {
    return null
  }
}

function key() {
  return Math.random().toString(36).slice(2, 10)
}

function withKeys(blocks = []) {
  return blocks.map((block) => ({
    ...block,
    _key: block._key || key(),
    children: (block.children || []).map((child) => ({
      ...child,
      _key: child._key || key(),
    })),
  }))
}

async function uploadImage(client, url, filename) {
  if (!url) return null
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch image ${url}: ${res.status}`)
  const buffer = Buffer.from(await res.arrayBuffer())
  const contentType = res.headers.get('content-type') || 'image/jpeg'
  const asset = await client.assets.upload('image', buffer, {
    filename: filename || 'image.jpg',
    contentType,
  })
  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: asset._id },
  }
}

async function main() {
  loadEnv()

  const projectId =
    process.env.VITE_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID
  const dataset =
    process.env.VITE_SANITY_DATASET ||
    process.env.SANITY_STUDIO_DATASET ||
    'production'
  const token = loadAuthToken()

  if (!projectId || projectId === 'your-project-id') {
    throw new Error('Missing Sanity project ID in .env')
  }
  if (!token) {
    throw new Error(
      'Missing Sanity write token. Run `npx sanity login` or set SANITY_API_TOKEN.',
    )
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion: process.env.VITE_SANITY_API_VERSION || '2024-01-01',
    token,
    useCdn: false,
  })

  console.log(`Seeding project ${projectId} / ${dataset}…`)

  // Wipe articles first so category/author refs can be removed, then stale docs
  const keepIds = new Set([
    ...categories.map((c) => c._id),
    ...authors.map((a) => a._id),
    ...articles.map((a) => a._id),
  ])
  const allArticleIds = await client.fetch(`*[_type == "article"]._id`)
  if (allArticleIds.length) {
    console.log(`Clearing ${allArticleIds.length} articles…`)
    for (const id of allArticleIds) {
      await client.delete(id)
    }
  }
  const leftover = await client.fetch(
    `*[_type in ["author","category"]]._id`,
  )
  for (const id of leftover) {
    if (keepIds.has(id)) continue
    await client.delete(id)
    console.log(`  − removed ${id}`)
  }

  for (const cat of categories) {
    await client.createOrReplace({
      _id: cat._id,
      _type: 'category',
      title: cat.title,
      slug: { _type: 'slug', current: cat.slug },
      color: '#c41e26',
    })
    console.log(`✓ category ${cat.title}`)
  }

  for (const author of authors) {
    await client.createOrReplace({
      _id: author._id,
      _type: 'author',
      name: author.name,
      slug: { _type: 'slug', current: author.slug },
    })
    console.log(`✓ author ${author.name}`)
  }

  const imageCache = new Map()

  for (const article of articles) {
    let mainImage
    const imageUrl = article.mainImage?.url
    if (imageUrl) {
      const meta = {
        alt: article.mainImage.alt,
        photographer: article.mainImage.photographer,
        source: article.mainImage.source,
        sourceUrl: article.mainImage.sourceUrl,
        licence: article.mainImage.licence,
        attributionRequired: Boolean(article.mainImage.attributionRequired),
        downloadDate: article.mainImage.downloadDate,
      }
      if (imageCache.has(imageUrl)) {
        mainImage = { ...imageCache.get(imageUrl), ...meta }
      } else {
        try {
          const uploaded = await uploadImage(
            client,
            imageUrl,
            `${article.slug}.jpg`,
          )
          imageCache.set(imageUrl, uploaded)
          mainImage = { ...uploaded, ...meta }
          console.log(`  ↑ image ${article.slug}`)
        } catch (err) {
          console.warn(`  ! image failed for ${article.slug}: ${err.message}`)
        }
      }
    }

    await client.createOrReplace({
      _id: article._id,
      _type: 'article',
      title: article.title,
      slug: { _type: 'slug', current: article.slug },
      excerpt: article.excerpt,
      mainImage,
      sources: (article.sources || []).map((s) => ({
        _type: 'object',
        _key: key(),
        label: s.label,
        url: s.url,
      })),
      category: article.category
        ? { _type: 'reference', _ref: article.category._id }
        : undefined,
      author: article.author
        ? { _type: 'reference', _ref: article.author._id }
        : undefined,
      publishedAt: article.publishedAt,
      featured: Boolean(article.featured),
      isLead: Boolean(article.isLead),
      isLive: Boolean(article.isLive),
      body: withKeys(article.body),
    })
    console.log(`✓ article ${article.slug}`)
  }

  console.log(
    `\nDone. Uploaded ${categories.length} categories, ${authors.length} authors, ${articles.length} articles.`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
