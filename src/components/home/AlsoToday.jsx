import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

const INTERVAL_MS = 6000

function buildTopicPacks(articles = [], excludeIds = []) {
  const excluded = new Set(excludeIds.filter(Boolean))
  const pool = articles.filter((a) => a && !excluded.has(a._id))

  const byTopic = new Map()
  for (const article of pool) {
    const key =
      article.category?.slug ||
      article.category?.title?.toLowerCase() ||
      'desk'
    if (!byTopic.has(key)) {
      byTopic.set(key, {
        id: key,
        label: article.category?.title || 'Desk',
        items: [],
      })
    }
    byTopic.get(key).items.push(article)
  }

  const packs = []
  for (const topic of byTopic.values()) {
    if (topic.items.length < 2) continue

    const live = topic.items.find((a) => a.isLive) || null
    const remaining = topic.items.filter((a) => a._id !== live?._id)
    const lead = remaining[0] || live
    const list = remaining
      .filter((a) => a._id !== lead?._id)
      .slice(0, 4)

    // If a topic is thin, pull one related story from another section
    if (list.length < 3) {
      for (const other of byTopic.values()) {
        if (other.id === topic.id) continue
        for (const candidate of other.items) {
          if (
            candidate._id === lead?._id ||
            candidate._id === live?._id ||
            list.some((x) => x._id === candidate._id)
          ) {
            continue
          }
          list.push(candidate)
          if (list.length >= 3) break
        }
        if (list.length >= 3) break
      }
    }

    packs.push({
      id: topic.id,
      label: topic.label,
      lead,
      live: live && live._id !== lead?._id ? live : null,
      list: list.slice(0, 4),
    })
  }

  // Prefer topics with more stories first
  return packs.sort((a, b) => b.list.length - a.list.length)
}

export default function AlsoToday({
  articles = [],
  excludeIds = [],
  // legacy props kept as fallback
  sidebar = [],
  secondary = [],
  live: liveProp,
}) {
  const packs = useMemo(() => {
    const built = buildTopicPacks(articles, excludeIds)
    if (built.length) return built

    // Fallback: single pack from old homepage split
    const [lead, ...briefs] = sidebar
    const extras = secondary.slice(0, liveProp ? 2 : 3)
    if (!lead && !liveProp && !briefs.length && !extras.length) return []
    return [
      {
        id: 'desk',
        label: 'Desk',
        lead,
        live: liveProp || null,
        list: [...briefs, ...extras].slice(0, 4),
      },
    ]
  }, [articles, excludeIds, sidebar, secondary, liveProp])

  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    setActive(0)
  }, [packs.length])

  useEffect(() => {
    if (packs.length < 2 || paused) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % packs.length)
    }, INTERVAL_MS)

    return () => window.clearInterval(id)
  }, [packs.length, paused])

  if (!packs.length) return null

  const pack = packs[active] || packs[0]
  const { lead, live, list } = pack

  return (
    <section className="also-today border-t border-ink/10">
      <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 sm:py-16 md:px-8">
        <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="dot-label">Also today</p>
            <h2 className="mt-3 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.05] tracking-tight">
              Stories still moving
            </h2>
            <p className="mt-3 font-mono text-[12px] leading-relaxed text-muted sm:text-[13px]">
              Rotating desks by topic — related reads from across Magazin.
            </p>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            {pack.label} desk · {active + 1}/{packs.length}
          </p>
        </header>

        {/* Topic switcher */}
        <div
          className="mt-8 flex gap-2 overflow-x-auto pb-1"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {packs.map((topic, i) => (
            <button
              key={topic.id}
              type="button"
              onClick={() => setActive(i)}
              className={`shrink-0 border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors ${
                i === active
                  ? 'border-brand bg-brand text-paper'
                  : 'border-ink/15 text-muted hover:border-brand/40 hover:text-ink'
              }`}
            >
              {topic.label}
            </button>
          ))}
        </div>

        {/* Progress */}
        {packs.length > 1 && (
          <div className="mt-3 h-[2px] bg-ink/10">
            <div
              key={`${active}-${paused}`}
              className={`h-full bg-brand ${paused ? '' : 'also-today-progress'}`}
              style={paused ? { width: '100%', opacity: 0.35 } : undefined}
            />
          </div>
        )}

        <div
          key={pack.id}
          className="also-today-stage mt-8 grid gap-10 animate-fade-in lg:mt-10 lg:grid-cols-12 lg:gap-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {lead && (
            <Link to={`/article/${lead.slug}`} className="group lg:col-span-7">
              <div className="overflow-hidden bg-paper-muted">
                {lead.mainImage?.url ? (
                  <img
                    src={lead.mainImage.url}
                    alt={lead.mainImage.alt || ''}
                    className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                ) : (
                  <div className="aspect-[16/10] bg-paper-muted" />
                )}
              </div>
              <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-brand">
                {lead.category?.title}
              </p>
              <h3 className="mt-2 font-display text-[clamp(1.4rem,3vw,2rem)] font-semibold leading-[1.12] tracking-tight transition-colors group-hover:text-brand">
                {lead.title}
              </h3>
              {lead.excerpt && (
                <p className="mt-3 max-w-xl font-mono text-[13px] leading-relaxed text-muted">
                  {lead.excerpt}
                </p>
              )}
            </Link>
          )}

          <div className="flex flex-col lg:col-span-5">
            {live && (
              <Link
                to={`/article/${live.slug}`}
                className="group mb-8 border-b border-brand/25 pb-8"
              >
                <span className="inline-flex items-center gap-2 overflow-hidden bg-brand px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-paper">
                  <span className="relative flex h-2 w-2 shrink-0 overflow-hidden">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-paper/40" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-paper" />
                  </span>
                  Live
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold leading-snug tracking-tight transition-colors group-hover:text-brand">
                  {live.title}
                </h3>
                {live.excerpt && (
                  <p className="mt-2 font-mono text-[12px] leading-relaxed text-muted">
                    {live.excerpt}
                  </p>
                )}
              </Link>
            )}

            <div className="flex flex-1 flex-col divide-y divide-ink/10">
              {list.map((article) => (
                <Link
                  key={article._id}
                  to={`/article/${article.slug}`}
                  className="group grid grid-cols-[1fr_72px] items-start gap-4 py-5 first:pt-0 last:pb-0 sm:grid-cols-[1fr_96px] sm:gap-5"
                >
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-brand">
                      {article.category?.title}
                    </p>
                    <h3 className="mt-1.5 font-display text-[1.05rem] font-semibold leading-snug tracking-tight transition-colors group-hover:text-brand sm:text-lg">
                      {article.title}
                    </h3>
                  </div>
                  {article.mainImage?.url ? (
                    <img
                      src={article.mainImage.url}
                      alt=""
                      className="aspect-square w-full object-cover sm:aspect-[4/3]"
                      loading="lazy"
                    />
                  ) : (
                    <div className="aspect-square bg-paper-muted sm:aspect-[4/3]" />
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
