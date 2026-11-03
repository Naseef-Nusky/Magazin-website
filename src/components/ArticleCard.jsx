import { Link } from 'react-router-dom'
import CategoryLabel from './CategoryLabel'

export function FeaturedStripCard({ article }) {
  if (!article) return null

  return (
    <Link
      to={`/article/${article.slug}`}
      className="group flex flex-col border border-ink/10 bg-paper transition-colors hover:border-ink/25"
    >
      {article.mainImage?.url ? (
        <div className="overflow-hidden">
          <img
            src={article.mainImage.url}
            alt={article.mainImage.alt || ''}
            className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="aspect-[16/10] bg-paper-muted" />
      )}
      <div className="flex flex-1 flex-col p-4">
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-brand">
          {article.author?.name || 'Feature'}
        </p>
        <h3 className="mt-2 font-display text-[1.05rem] font-medium leading-snug tracking-tight text-ink transition-colors group-hover:text-brand">
          {article.title}
        </h3>
      </div>
    </Link>
  )
}

export function TextStory({ article, showCategory = true }) {
  if (!article) return null

  return (
    <Link to={`/article/${article.slug}`} className="group block border-b border-ink/10 py-4 last:border-b-0">
      {showCategory && <CategoryLabel>{article.category?.title}</CategoryLabel>}
      <h3 className="mt-2 font-display text-[1.05rem] font-medium leading-snug tracking-tight text-ink transition-colors group-hover:text-brand">
        {article.title}
      </h3>
      {article.excerpt && (
        <p className="mt-2 line-clamp-2 font-mono text-[12px] leading-relaxed text-muted">
          {article.excerpt}
        </p>
      )}
    </Link>
  )
}

export function SidebarStory({ article, withThumb = false }) {
  if (!article) return null
  const showThumb = withThumb && article.mainImage?.url

  return (
    <Link
      to={`/article/${article.slug}`}
      className={`group grid gap-3 py-4 sm:gap-4 sm:py-5 ${
        showThumb ? 'grid-cols-[1fr_72px] sm:grid-cols-[1fr_88px]' : 'grid-cols-1'
      }`}
    >
      <div className="min-w-0">
        <CategoryLabel>{article.category?.title}</CategoryLabel>
        <h3 className="mt-2 font-display text-[1rem] font-medium leading-snug tracking-tight text-ink transition-colors group-hover:text-brand sm:text-[1.05rem]">
          {article.title}
        </h3>
      </div>
      {showThumb && (
        <img
          src={article.mainImage.url}
          alt={article.mainImage.alt || ''}
          className="h-[72px] w-[72px] object-cover sm:h-20 sm:w-[88px]"
          loading="lazy"
        />
      )}
    </Link>
  )
}

export function LiveBlock({ article }) {
  if (!article) return null

  return (
    <Link
      to={`/article/${article.slug}`}
      className="group flex h-full min-h-[160px] flex-col bg-ink p-4 text-white transition-opacity hover:opacity-95 sm:min-h-[180px] sm:p-5"
    >
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
        </span>
        <CategoryLabel tone="live">Live</CategoryLabel>
      </div>
      <h3 className="mt-4 font-display text-lg font-medium leading-snug tracking-tight">
        {article.title}
      </h3>
      {article.excerpt && (
        <p className="mt-2 font-mono text-[12px] leading-relaxed text-white/55">{article.excerpt}</p>
      )}
      <span className="mt-auto pt-5 font-mono text-[11px] uppercase tracking-wide text-brand">
        Follow updates →
      </span>
    </Link>
  )
}

export function ImageStory({ article }) {
  if (!article) return null

  return (
    <Link to={`/article/${article.slug}`} className="group block">
      {article.mainImage?.url && (
        <div className="overflow-hidden">
          <img
            src={article.mainImage.url}
            alt={article.mainImage.alt || ''}
            className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>
      )}
      <div className="mt-3">
        <CategoryLabel>{article.category?.title}</CategoryLabel>
        <h3 className="mt-2 font-display text-[1.05rem] font-medium leading-snug tracking-tight text-ink transition-colors group-hover:text-brand">
          {article.title}
        </h3>
      </div>
    </Link>
  )
}
