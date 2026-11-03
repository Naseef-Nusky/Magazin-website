import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { CategoryLayout } from '../components/category/layouts'
import { getCategoryTheme } from '../lib/categoryThemes'
import { getArticles, getCategories } from '../lib/sanity'

export default function CategoryPage() {
  const { slug } = useParams()
  const [articles, setArticles] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const theme = getCategoryTheme(slug)

  useEffect(() => {
    let alive = true
    setLoading(true)
    ;(async () => {
      const [a, c] = await Promise.all([getArticles(), getCategories()])
      if (!alive) return
      setArticles(a)
      setCategories(c)
      setLoading(false)
      window.scrollTo(0, 0)
    })()
    return () => {
      alive = false
    }
  }, [slug])

  const filtered = articles.filter(
    (a) => a.category?.slug === slug || a.category?.title?.toLowerCase() === slug,
  )

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header categories={categories} activeSlug={slug} />

      {loading ? (
        <div className="mx-auto max-w-[1200px] space-y-6 px-4 py-12 sm:px-6 sm:py-16 md:px-8">
          <div className="h-8 w-40 animate-pulse bg-ink/10" />
          <div className="h-14 w-full max-w-72 animate-pulse bg-ink/10" />
          <div className="media-hero animate-pulse bg-ink/5" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="mx-auto max-w-[700px] px-4 py-12 text-center sm:px-6 sm:py-24">
          <p className="dot-label mx-auto justify-center text-[10px] sm:text-[11px]">Section</p>
          <h1 className="mt-4 break-words font-display text-[clamp(2rem,8vw,2.5rem)] font-semibold tracking-tight sm:text-4xl">
            {theme.label}
          </h1>
          <p className="mt-3 font-mono text-[13px] text-muted sm:text-sm">
            No articles in this section yet.
          </p>
        </div>
      ) : (
        <CategoryLayout theme={theme} articles={filtered} />
      )}

      <Footer />
    </div>
  )
}
