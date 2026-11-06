import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import {
  articles as demoArticles,
  categories as demoCategories,
  sortCategoriesByNav,
} from '../data/demoArticles'

// Fallbacks so production still reads Sanity if Vercel env vars were forgotten
const projectId =
  import.meta.env.VITE_SANITY_PROJECT_ID ||
  (import.meta.env.PROD ? 'cm10f4zr' : undefined)
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01'

export const isSanityConfigured = Boolean(projectId && projectId !== 'your-project-id')

export const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      // CDN is fast for readers; list queries stay light so freshness feels snappy
      useCdn: !import.meta.env.DEV,
      withCredentials: false,
    })
  : null

const builder = client ? imageUrlBuilder(client) : null

export function urlFor(source, { width = 1200, quality = 75 } = {}) {
  if (!source) return null
  if (source.url && !builder) return source.url
  if (!builder) return null
  return builder.image(source).width(width).auto('format').quality(quality).url()
}

/** Card / listing fields — no Portable Text body (keeps homepage fast) */
const cardFields = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  mainImage,
  "category": category->{ _id, title, "slug": slug.current, color },
  "author": author->{ _id, name, "slug": slug.current },
  publishedAt,
  featured,
  isLead,
  isLive
`

const detailFields = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  mainImage,
  sources[]{ label, url },
  "category": category->{ _id, title, "slug": slug.current, color },
  "author": author->{ _id, name, "slug": slug.current, image, bio },
  publishedAt,
  featured,
  isLead,
  isLive,
  body
`

function normalizeArticle(article, { imageWidth = 900 } = {}) {
  if (!article) return null
  return {
    ...article,
    mainImage: article.mainImage
      ? {
          ...article.mainImage,
          url: article.mainImage.url || urlFor(article.mainImage, { width: imageWidth }),
          alt: article.mainImage.alt || article.title,
        }
      : null,
  }
}

const cache = {
  articles: null,
  articlesAt: 0,
  categories: null,
  categoriesAt: 0,
  articleBySlug: new Map(),
  inflightArticles: null,
  inflightCategories: null,
}

const LIST_TTL_MS = 60_000
const ARTICLE_TTL_MS = 60_000

function isFresh(at, ttl) {
  return at > 0 && Date.now() - at < ttl
}

/** Instant paint from memory when available (may be slightly stale). */
export function peekArticles() {
  return cache.articles
}

export function peekCategories() {
  return cache.categories
}

export async function getArticles({ force = false } = {}) {
  if (!force && cache.articles && isFresh(cache.articlesAt, LIST_TTL_MS)) {
    return cache.articles
  }

  if (!force && cache.inflightArticles) {
    return cache.inflightArticles
  }

  const load = (async () => {
    if (!client) {
      const demo = demoArticles.map((a) => normalizeArticle(a, { imageWidth: 900 }))
      cache.articles = demo
      cache.articlesAt = Date.now()
      return demo
    }

    try {
      const result = await client.fetch(
        `*[_type == "article"] | order(publishedAt desc) { ${cardFields} }`,
      )
      const articles = (result?.length ? result : demoArticles).map((a) =>
        normalizeArticle(a, { imageWidth: 900 }),
      )
      cache.articles = articles
      cache.articlesAt = Date.now()
      return articles
    } catch (error) {
      console.warn('Sanity fetch failed, using demo content.', error)
      if (cache.articles) return cache.articles
      return demoArticles.map((a) => normalizeArticle(a, { imageWidth: 900 }))
    } finally {
      cache.inflightArticles = null
    }
  })()

  cache.inflightArticles = load
  return load
}

export async function getArticleBySlug(slug, { force = false } = {}) {
  const hit = cache.articleBySlug.get(slug)
  if (!force && hit && isFresh(hit.at, ARTICLE_TTL_MS)) {
    return hit.data
  }

  if (!client) {
    const demo = normalizeArticle(
      demoArticles.find((a) => a.slug === slug) || null,
      { imageWidth: 1400 },
    )
    cache.articleBySlug.set(slug, { data: demo, at: Date.now() })
    return demo
  }

  try {
    const result = await client.fetch(
      `*[_type == "article" && slug.current == $slug][0]{ ${detailFields} }`,
      { slug },
    )
    const article = result
      ? normalizeArticle(result, { imageWidth: 1400 })
      : normalizeArticle(demoArticles.find((a) => a.slug === slug) || null, {
          imageWidth: 1400,
        })
    cache.articleBySlug.set(slug, { data: article, at: Date.now() })
    return article
  } catch (error) {
    console.warn('Sanity fetch failed, using demo content.', error)
    if (hit?.data) return hit.data
    return normalizeArticle(demoArticles.find((a) => a.slug === slug) || null, {
      imageWidth: 1400,
    })
  }
}

export async function getCategories({ force = false } = {}) {
  if (!force && cache.categories && isFresh(cache.categoriesAt, LIST_TTL_MS)) {
    return cache.categories
  }

  if (!force && cache.inflightCategories) {
    return cache.inflightCategories
  }

  const load = (async () => {
    if (!client) {
      const demo = sortCategoriesByNav(demoCategories)
      cache.categories = demo
      cache.categoriesAt = Date.now()
      return demo
    }

    try {
      const result = await client.fetch(
        `*[_type == "category"] {
          _id, title, "slug": slug.current, color
        }`,
      )
      const categories = sortCategoriesByNav(result?.length ? result : demoCategories)
      cache.categories = categories
      cache.categoriesAt = Date.now()
      return categories
    } catch {
      if (cache.categories) return cache.categories
      return sortCategoriesByNav(demoCategories)
    } finally {
      cache.inflightCategories = null
    }
  })()

  cache.inflightCategories = load
  return load
}

export function splitHomepage(articles) {
  const lead = articles.find((a) => a.isLead) || articles[0]
  const featured = articles.filter((a) => a.featured && a._id !== lead?._id).slice(0, 3)
  const live = articles.find((a) => a.isLive && a._id !== lead?._id)
  const used = new Set([lead?._id, ...featured.map((a) => a._id), live?._id].filter(Boolean))

  const rest = articles.filter((a) => !used.has(a._id))
  const sidebar = rest.slice(0, 3)
  sidebar.forEach((a) => used.add(a._id))

  const afterSidebar = rest.filter((a) => !used.has(a._id))
  const secondary = afterSidebar.slice(0, 3)
  secondary.forEach((a) => used.add(a._id))

  const imageGrid = articles
    .filter((a) => a.mainImage && !used.has(a._id))
    .slice(0, 5)
  imageGrid.forEach((a) => used.add(a._id))

  // Fill mosaic if we ran short of unused image stories
  if (imageGrid.length < 5) {
    for (const a of articles) {
      if (imageGrid.length >= 5) break
      if (!a.mainImage || imageGrid.some((x) => x._id === a._id) || a._id === lead?._id) continue
      imageGrid.push(a)
      used.add(a._id)
    }
  }

  const more = articles.filter((a) => !used.has(a._id))

  return { lead, featured, live, sidebar, secondary, imageGrid, more }
}
