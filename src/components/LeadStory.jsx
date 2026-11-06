import { Link } from 'react-router-dom'

export default function LeadStory({ article }) {
  if (!article) return null

  return (
    <article className="animate-rise group">
      <Link to={`/article/${article.slug}`} className="block">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="bg-brand px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wide text-paper">
            New
          </span>
          {article.category?.title && (
            <span className="border border-ink/20 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wide text-ink/70">
              {article.category.title}
            </span>
          )}
        </div>

        {article.mainImage?.url && (
          <figure className="overflow-hidden">
            <img
              src={article.mainImage.url}
              alt={article.mainImage.alt || ''}
              className="media-hero w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
          </figure>
        )}

        <h1 className="mt-6 max-w-4xl font-display text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-[1.1] text-ink transition-colors group-hover:text-brand">
          {article.title}
        </h1>
        {article.excerpt && (
          <p className="mt-4 max-w-2xl font-mono text-[13px] leading-relaxed text-muted md:text-sm">
            {article.excerpt}
          </p>
        )}
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <span className="font-mono text-[11px] font-medium uppercase tracking-wide text-brand">
            Read story →
          </span>
        </div>
      </Link>
    </article>
  )
}
