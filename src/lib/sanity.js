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
      // Fresh data while developing; CDN in production builds
      useCdn: !import.meta.env.DEV,
      // Public dataset — avoid credentialed CORS failures on new domains
      withCredentials: false,
    })
  : null

const builder = client ? imageUrlBuilder(client) : null

export function urlFor(source) {
  if (!source) return null
  if (source.url) return source.url
  if (!builder) return null
  return builder.image(source).width(1200).url()
}

const articleFields = `
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

function normalizeArticle(article) {
  if (!article) return null
  return {
    ...article,
    mainImage: article.mainImage
      ? {
          ...article.mainImage,
          url: article.mainImage.url || urlFor(article.mainImage),
          alt: article.mainImage.alt || article.title,
        }
      : null,
  }
}

export async function getArticles() {
  if (!client) {
    return demoArticles.map(normalizeArticle)
  }

  try {
    const result = await client.fetch(
      `*[_type == "article"] | order(publishedAt desc) { ${articleFields} }`,
    )
    if (!result?.length) return demoArticles.map(normalizeArticle)
    return result.map(normalizeArticle)
  } catch (error) {
    console.warn('Sanity fetch failed, using demo content.', error)
    return demoArticles.map(normalizeArticle)
  }
}

export async function getArticleBySlug(slug) {
  if (!client) {
    return normalizeArticle(demoArticles.find((a) => a.slug === slug) || null)
  }

  try {
    const result = await client.fetch(
      `*[_type == "article" && slug.current == $slug][0]{ ${articleFields} }`,
      { slug },
    )
    if (!result) {
      return normalizeArticle(demoArticles.find((a) => a.slug === slug) || null)
    }
    return normalizeArticle(result)
  } catch (error) {
    console.warn('Sanity fetch failed, using demo content.', error)
    return normalizeArticle(demoArticles.find((a) => a.slug === slug) || null)
  }
}

export async function getCategories() {
  if (!client) return sortCategoriesByNav(demoCategories)

  try {
    const result = await client.fetch(
      `*[_type == "category"] {
        _id, title, "slug": slug.current, color
      }`,
    )
    return sortCategoriesByNav(result?.length ? result : demoCategories)
  } catch {
    return sortCategoriesByNav(demoCategories)
  }
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
