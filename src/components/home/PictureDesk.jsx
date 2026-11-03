import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const INTERVAL_MS = 4500

function pad(n) {
  return String(n + 1).padStart(2, '0')
}

export default function PictureDesk({ articles = [] }) {
  const frames = articles.filter(Boolean).slice(0, 5)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (frames.length < 2 || paused) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % frames.length)
    }, INTERVAL_MS)

    return () => window.clearInterval(id)
  }, [frames.length, paused])

  if (!frames.length) return null

  const current = frames[active]

  return (
    <section className="picture-desk border-t border-ink/10 bg-paper">
      <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 sm:py-16 md:px-8">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <p className="dot-label">Picture desk</p>
            <h2 className="mt-3 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.05] tracking-tight">
              In focus
            </h2>
            <p className="mt-3 font-mono text-[12px] leading-relaxed text-muted sm:text-[13px]">
              Selected frames from today&apos;s coverage — cycling live.
            </p>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            Frame {pad(active)} of {String(frames.length).padStart(2, '0')}
          </p>
        </header>

        <div
          className="mt-10 grid gap-4 lg:mt-12 lg:grid-cols-12 lg:gap-5"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Changing stage */}
          <Link
            to={`/article/${current.slug}`}
            className="group relative col-span-full min-h-[280px] overflow-hidden bg-ink sm:min-h-[360px] lg:col-span-8 lg:min-h-[480px]"
          >
            {frames.map((article, i) => (
              <div
                key={article._id}
                className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                  i === active ? 'opacity-100' : 'opacity-0'
                }`}
                aria-hidden={i !== active}
              >
                {article.mainImage?.url && (
                  <img
                    src={article.mainImage.url}
                    alt={article.mainImage.alt || ''}
                    className={`h-full w-full object-cover transition-transform duration-[4500ms] ease-out ${
                      i === active ? 'scale-105' : 'scale-100'
                    }`}
                  />
                )}
              </div>
            ))}

            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand">
                {current.category?.title}
              </p>
              <h3 className="mt-2 max-w-2xl font-display text-[clamp(1.35rem,3.5vw,2.25rem)] font-semibold leading-snug text-white">
                {current.title}
              </h3>
              <span className="mt-4 inline-flex font-mono text-[11px] uppercase tracking-wide text-white/75 transition-transform group-hover:translate-x-1">
                View story →
              </span>
            </div>

            {/* Progress */}
            <div className="absolute inset-x-0 top-0 h-[3px] bg-white/15">
              <div
                key={`${active}-${paused}`}
                className={`h-full bg-brand ${paused ? '' : 'picture-progress'}`}
                style={paused ? { width: '100%', opacity: 0.45 } : undefined}
              />
            </div>
          </Link>

          {/* Frame picker */}
          <div className="col-span-full flex gap-3 overflow-x-auto pb-1 lg:col-span-4 lg:flex-col lg:overflow-visible lg:pb-0">
            {frames.map((article, i) => {
              const isActive = i === active
              return (
                <button
                  key={article._id}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`group flex min-w-[220px] flex-1 items-stretch gap-3 border text-left transition-colors lg:min-w-0 ${
                    isActive
                      ? 'border-brand bg-brand text-paper'
                      : 'border-ink/10 bg-paper-muted text-ink hover:border-brand/40'
                  }`}
                >
                  <div className="relative w-20 shrink-0 overflow-hidden sm:w-24">
                    {article.mainImage?.url ? (
                      <img
                        src={article.mainImage.url}
                        alt=""
                        className="h-full min-h-[72px] w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="h-full min-h-[72px] bg-ink/10" />
                    )}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-center py-3 pr-3">
                    <p
                      className={`font-mono text-[10px] uppercase tracking-[0.12em] ${
                        isActive ? 'text-paper/70' : 'text-brand'
                      }`}
                    >
                      {pad(i)} · {article.category?.title}
                    </p>
                    <h4
                      className={`mt-1 line-clamp-2 font-display text-[13px] font-semibold leading-snug sm:text-[14px] ${
                        isActive ? 'text-paper' : 'text-ink'
                      }`}
                    >
                      {article.title}
                    </h4>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
