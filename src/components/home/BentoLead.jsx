import { Link } from 'react-router-dom'

export default function BentoLead({ lead, sideStories = [] }) {
  if (!lead) return null
  const [a, b, c] = sideStories

  return (
    <div className="bento-grid grid grid-cols-12 gap-3 md:grid-rows-[auto_auto]">
      {/* Main lead — spans large */}
      <Link
        to={`/article/${lead.slug}`}
        className="group relative col-span-full overflow-hidden bg-ink md:col-span-8 md:row-span-2"
      >
        {lead.mainImage?.url && (
          <img
            src={lead.mainImage.url}
            alt={lead.mainImage.alt || ''}
            fetchPriority="high"
            decoding="async"
            className="h-full min-h-[260px] w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.04] sm:min-h-[320px] md:min-h-[480px]"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 md:p-8">
          <div className="mb-2 flex flex-wrap gap-2 sm:mb-3">
            <span className="bg-brand px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wide text-paper">
              Top story
            </span>
            {lead.category?.title && (
              <span className="border border-white/30 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-white/80">
                {lead.category.title}
              </span>
            )}
          </div>
          <h2 className="max-w-2xl font-display text-[clamp(1.35rem,5vw,2.35rem)] font-semibold leading-[1.1] text-white">
            {lead.title}
          </h2>
          {lead.excerpt && (
            <p className="mt-2 line-clamp-3 max-w-xl font-mono text-[12px] leading-relaxed text-white/65 sm:mt-3 sm:line-clamp-none md:text-[13px]">
              {lead.excerpt}
            </p>
          )}
          <span className="mt-3 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wide text-brand transition-transform group-hover:translate-x-1 sm:mt-4">
            Read story →
          </span>
        </div>
      </Link>

      {/* Side tiles */}
      {a && (
        <Link
          to={`/article/${a.slug}`}
          className="group relative col-span-full overflow-hidden bg-paper md:col-span-4"
        >
          {a.mainImage?.url ? (
            <img
              src={a.mainImage.url}
              alt=""
              className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.05] sm:aspect-[16/11]"
            />
          ) : (
            <div className="aspect-[16/10] bg-paper-muted sm:aspect-[16/11]" />
          )}
          <div className="border border-t-0 border-ink/10 p-3.5 sm:p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-brand">
              {a.category?.title}
            </p>
            <h3 className="mt-1.5 font-display text-[15px] font-semibold leading-snug tracking-tight transition-colors group-hover:text-brand sm:text-base">
              {a.title}
            </h3>
          </div>
        </Link>
      )}

      {b && (
        <Link
          to={`/article/${b.slug}`}
          className="group col-span-6 flex min-h-[140px] flex-col justify-between border border-ink/10 bg-ink p-4 text-white sm:p-5 md:col-span-2"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-brand">
            {b.category?.title || 'Brief'}
          </p>
          <h3 className="mt-3 font-display text-[14px] font-semibold leading-snug tracking-tight sm:text-[15px]">
            {b.title}
          </h3>
          <span className="mt-4 font-mono text-[10px] uppercase tracking-wide text-white/50 transition-colors group-hover:text-brand">
            Open →
          </span>
        </Link>
      )}

      {c && (
        <Link
          to={`/article/${c.slug}`}
          className="group col-span-6 flex min-h-[140px] flex-col justify-between border border-ink/10 bg-brand p-4 text-paper sm:p-5 md:col-span-2"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-paper/70">
            {c.category?.title || 'More'}
          </p>
          <h3 className="mt-3 font-display text-[14px] font-semibold leading-snug tracking-tight sm:text-[15px]">
            {c.title}
          </h3>
          <span className="mt-4 font-mono text-[10px] uppercase tracking-wide text-paper/60 transition-opacity group-hover:opacity-100">
            Open →
          </span>
        </Link>
      )}
    </div>
  )
}
