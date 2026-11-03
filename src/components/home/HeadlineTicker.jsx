import { Link } from 'react-router-dom'

export default function HeadlineTicker({ articles = [], placement = 'top' }) {
  const items = articles.slice(0, 8)
  if (!items.length) return null

  const loop = [...items, ...items]
  const edge =
    placement === 'bottom'
      ? 'border-t border-ink/10'
      : 'border-b border-ink/10'

  return (
    <div className={`ticker ${edge} bg-ink text-white`}>
      <div className="mx-auto flex max-w-[1200px] items-stretch px-4 sm:px-6 md:px-8">
        <div className="relative flex shrink-0 items-center gap-1.5 overflow-hidden bg-brand px-3 py-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-paper sm:gap-2 sm:px-4 sm:text-[11px]">
          <span className="relative flex h-2 w-2 shrink-0 items-center justify-center overflow-hidden">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-paper/40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-paper" />
          </span>
          Live
        </div>
        <div className="ticker-mask min-w-0 flex-1 overflow-hidden">
          <div className="ticker-track flex w-max gap-8 py-2.5 pl-4 will-change-transform sm:gap-10 sm:pl-5">
            {loop.map((article, i) => (
              <Link
                key={`${article._id}-${i}`}
                to={`/article/${article.slug}`}
                className="flex shrink-0 items-center gap-2 font-mono text-[11px] text-white/85 transition-colors hover:text-brand sm:gap-3 sm:text-[12px]"
              >
                <span className="text-brand">◆</span>
                <span className="max-w-[28ch] truncate uppercase tracking-wide sm:max-w-[42ch]">
                  {article.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
