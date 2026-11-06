import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import HeadlineTicker from '../components/home/HeadlineTicker'
import BentoLead from '../components/home/BentoLead'
import FeatureRail from '../components/home/FeatureRail'
import AlsoToday from '../components/home/AlsoToday'
import PictureDesk from '../components/home/PictureDesk'
import ScrollReveal from '../components/home/ScrollReveal'
import { getArticles, getCategories, splitHomepage } from '../lib/sanity'

function formatMastheadDate(date = new Date()) {
  return date.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default function HomePage() {
  const [articles, setArticles] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    ;(async () => {
      const [a, c] = await Promise.all([getArticles(), getCategories()])
      if (!alive) return
      setArticles(a)
      setCategories(c)
      setLoading(false)
    })()
    return () => {
      alive = false
    }
  }, [])

  const { lead, featured, live, sidebar, secondary, imageGrid } = splitHomepage(articles)
  const bentoSide = [...featured.slice(0, 1), ...sidebar.slice(0, 2)]

  return (
    <div className="home-shell min-h-screen text-ink">
      <Header categories={categories} />
      <HeadlineTicker articles={articles} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="hero-orb hero-orb-a" aria-hidden />
        <div className="hero-orb hero-orb-b" aria-hidden />

        <div className="relative mx-auto max-w-[1200px] px-4 pt-8 sm:px-6 sm:pt-12 md:px-8 md:pt-16">
          <div className="animate-fade-in">
            <p className="dot-label text-[10px] sm:text-[11px]">Veridoxa · {formatMastheadDate()}</p>
          </div>

          <h1 className="hero-title mt-5 max-w-4xl font-display text-[clamp(2.15rem,9vw,5rem)] font-semibold leading-[0.98] text-ink sm:mt-6">
            Veridoxa&apos;s{' '}
            <span className="hero-word">latest</span>{' '}
            stories
          </h1>

          <p className="mt-4 max-w-xl animate-rise font-mono text-[12px] leading-relaxed text-muted sm:mt-5 sm:text-[13px] md:text-sm" style={{ animationDelay: '120ms' }}>
            Perspective. Insight. Truth. Free to read — no paywall, no login.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-8">
        {/* Complex bento lead */}
        <ScrollReveal className="mt-8 sm:mt-12 md:mt-14">
          {loading ? (
            <div className="media-hero animate-pulse bg-ink/5" />
          ) : (
            <BentoLead lead={lead} sideStories={bentoSide} />
          )}
        </ScrollReveal>

        {/* Auto-scrolling feature rail */}
        <ScrollReveal className="mt-[clamp(48px,8vw,100px)]" delay={80}>
          <div className="mb-5 flex items-end justify-between gap-3 sm:mb-6 sm:gap-4">
            <div className="min-w-0">
              <p className="dot-label">Opinion & features</p>
              <h2 className="mt-2 font-display text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl">
                Worth your time
              </h2>
            </div>
            <Link
              to="/category/opinion"
              className="shrink-0 font-mono text-[11px] uppercase tracking-wide text-muted transition-colors hover:text-brand sm:text-[12px]"
            >
              See all →
            </Link>
          </div>
          {loading ? (
            <div className="flex gap-4 overflow-hidden">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-56 w-72 shrink-0 animate-pulse bg-ink/5" />
              ))}
            </div>
          ) : (
            <FeatureRail articles={featured.length ? featured : articles.slice(0, 4)} />
          )}
        </ScrollReveal>
      </div>

      {/* Also today — complex desk */}
      <ScrollReveal className="mt-[clamp(56px,9vw,110px)]">
        {loading ? (
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-8">
            <div className="aspect-[16/9] animate-pulse bg-ink/5" />
          </div>
        ) : (
          <AlsoToday
            articles={articles}
            excludeIds={[lead?._id]}
            sidebar={sidebar}
            secondary={secondary}
            live={live}
          />
        )}
      </ScrollReveal>

      {/* Picture desk — mosaic */}
      <ScrollReveal className="mt-[clamp(56px,9vw,110px)] pb-6" delay={80}>
        {loading ? (
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-8">
            <div className="aspect-[21/9] animate-pulse bg-ink/5" />
          </div>
        ) : (
          <PictureDesk articles={imageGrid} />
        )}
      </ScrollReveal>

      <div className="mt-[clamp(48px,8vw,96px)]">
        <HeadlineTicker articles={articles} placement="bottom" />
      </div>

      <Footer flush />
    </div>
  )
}
