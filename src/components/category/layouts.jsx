import { Link } from 'react-router-dom'

function formatDate(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  })
}

function SectionHero({ theme, count }) {
  return (
    <header className="animate-fade-in w-full">
      <div className="flex items-center justify-between gap-4">
        <Link
          to="/"
          className="inline-flex w-fit shrink-0 items-center gap-1.5 py-1 font-mono text-[11px] uppercase tracking-wide text-muted transition-colors hover:text-brand sm:text-[12px]"
        >
          <span aria-hidden>←</span>
          Magazin
        </Link>
        <p className="dot-label ml-auto shrink-0 text-[10px] sm:text-[11px]">
          Section · {count} {count === 1 ? 'story' : 'stories'}
        </p>
      </div>
      <div className="mt-5 max-w-3xl sm:mt-7">
        <h1 className="break-words font-display text-[clamp(2rem,9vw,4rem)] font-semibold leading-[1.02] tracking-tight text-ink">
          {theme.label}
        </h1>
        <p className="mt-3 max-w-xl font-mono text-[12px] leading-relaxed text-muted sm:mt-4 sm:text-[13px] md:text-sm">
          {theme.tagline}
        </p>
      </div>
    </header>
  )
}

function FeatureLead({ article, theme, badge = 'Featured' }) {
  if (!article) return null
  return (
    <Link to={`/article/${article.slug}`} className="group mt-8 block animate-rise sm:mt-12">
      <div className="mb-3 flex flex-wrap gap-2 sm:mb-4">
        <span className="bg-brand px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wide text-paper">
          {badge}
        </span>
        {article.category?.title && (
          <span className="border border-ink/20 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wide text-ink/70">
            {article.category.title}
          </span>
        )}
      </div>
      {article.mainImage?.url && (
        <div className="overflow-hidden bg-paper-muted">
          <img
            src={article.mainImage.url}
            alt=""
            className="media-hero w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
        </div>
      )}
      <h2 className="mt-4 max-w-4xl font-display text-[clamp(1.35rem,5vw,2.5rem)] font-semibold leading-[1.1] tracking-tight text-ink transition-colors group-hover:text-brand sm:mt-6">
        {article.title}
      </h2>
      {article.excerpt && (
        <p className="mt-3 max-w-2xl font-mono text-[12px] leading-relaxed text-muted sm:text-[13px]">
          {article.excerpt}
        </p>
      )}
      <div className="mt-4 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-wide sm:gap-4">
        <span className="text-brand">Read story →</span>
      </div>
    </Link>
  )
}

function StoryCard({ article, theme }) {
  return (
    <Link
      to={`/article/${article.slug}`}
      className="group flex flex-col border border-ink/10 bg-paper transition-colors hover:border-ink/25"
    >
      {article.mainImage?.url ? (
        <div className="overflow-hidden">
          <img
            src={article.mainImage.url}
            alt=""
            className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="aspect-[16/10] bg-paper-muted" />
      )}
      <div className="flex flex-1 flex-col p-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-brand">
          {formatDate(article.publishedAt)}
        </p>
        <h3 className="mt-2 font-display text-[1.05rem] font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-brand">
          {article.title}
        </h3>
      </div>
    </Link>
  )
}

function StoryRow({ article, theme, index }) {
  const hasImage = Boolean(article.mainImage?.url)
  return (
    <Link
      to={`/article/${article.slug}`}
      className={`group grid items-start gap-3 border-b border-ink/10 py-5 sm:items-center sm:gap-5 sm:py-6 ${
        hasImage
          ? 'grid-cols-[1fr_88px] sm:grid-cols-[1fr_160px]'
          : 'grid-cols-1'
      }`}
    >
      <div className="min-w-0">
        <div className="flex items-center gap-3">
          {typeof index === 'number' && (
            <span className="font-mono text-[12px] text-muted">
              {String(index + 1).padStart(2, '0')}
            </span>
          )}
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-brand">
            {formatDate(article.publishedAt)}
          </p>
        </div>
        <h3 className="mt-2 font-display text-lg font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-brand sm:text-xl md:text-2xl">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="mt-2 line-clamp-2 hidden font-mono text-[12px] leading-relaxed text-muted sm:block">
            {article.excerpt}
          </p>
        )}
      </div>
      {article.mainImage?.url && (
        <img
          src={article.mainImage.url}
          alt=""
          className="aspect-square w-full object-cover sm:aspect-[16/10] sm:h-[100px] sm:w-40"
          loading="lazy"
        />
      )}
    </Link>
  )
}

const pagePad = 'mx-auto max-w-[1200px] px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16'

/** NEWS — lead + numbered list */
export function NewsLayout({ theme, articles }) {
  const [lead, ...rest] = articles
  return (
    <div className={pagePad}>
      <SectionHero theme={theme} count={articles.length} />
      <FeatureLead article={lead} theme={theme} badge="Top story" />
      <div className="mt-10 border-t border-ink/10 sm:mt-14">
        {rest.map((article, i) => (
          <StoryRow key={article._id} article={article} theme={theme} index={i} />
        ))}
      </div>
    </div>
  )
}

/** POLITICS — lead + 2-col card grid */
export function PoliticsLayout({ theme, articles }) {
  const [lead, ...rest] = articles
  return (
    <div className={pagePad}>
      <SectionHero theme={theme} count={articles.length} />
      <FeatureLead article={lead} theme={theme} badge="Briefing" />
      <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5">
        {rest.map((article) => (
          <StoryCard key={article._id} article={article} theme={theme} />
        ))}
      </div>
    </div>
  )
}

/** OPINION — author-forward essays, 2–3 in a row */
export function OpinionLayout({ theme, articles }) {
  return (
    <div className={pagePad}>
      <SectionHero theme={theme} count={articles.length} />
      <div className="mt-10 grid gap-6 sm:mt-14 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article._id}
            to={`/article/${article.slug}`}
            className="group flex flex-col bg-paper animate-rise"
          >
            {article.mainImage?.url && (
              <div className="overflow-hidden bg-paper-muted">
                <img
                  src={article.mainImage.url}
                  alt=""
                  className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
            )}
            <div className="flex flex-1 flex-col pt-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-brand sm:text-[11px]">
                {formatDate(article.publishedAt)}
              </p>
              <h2 className="mt-2 font-display text-lg font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-brand sm:text-xl">
                {article.title}
              </h2>
              {article.excerpt && (
                <p className="mt-2 line-clamp-3 font-mono text-[12px] leading-relaxed text-muted sm:text-[13px]">
                  {article.excerpt}
                </p>
              )}
              <span className="mt-auto pt-4 font-mono text-[11px] uppercase tracking-wide text-brand">
                Read essay →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

/** CULTURE — mosaic grid, tall cards */
export function CultureLayout({ theme, articles }) {
  const [lead, ...rest] = articles
  return (
    <div className={pagePad}>
      <SectionHero theme={theme} count={articles.length} />
      <FeatureLead article={lead} theme={theme} badge="Culture" />
      <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-5 lg:grid-cols-3">
        {rest.map((article) => (
          <Link key={article._id} to={`/article/${article.slug}`} className="group block">
            <div className="overflow-hidden bg-paper-muted">
              {article.mainImage?.url ? (
                <img
                  src={article.mainImage.url}
                  alt=""
                  className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              ) : (
                <div className="aspect-[4/5]" />
              )}
            </div>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-brand sm:mt-3">
              {formatDate(article.publishedAt)}
            </p>
            <h3 className="mt-1 font-display text-[15px] font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-brand sm:mt-1.5 sm:text-lg">
              {article.title}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  )
}

/** MONEY — ticker list + lead */
export function MoneyLayout({ theme, articles }) {
  const [lead, ...rest] = articles
  return (
    <div className={pagePad}>
      <SectionHero theme={theme} count={articles.length} />
      <div className="mt-6 flex items-center gap-3 border border-ink/10 bg-paper-muted px-3 py-2.5 font-mono text-[10px] uppercase tracking-wide text-brand sm:mt-8 sm:px-4 sm:text-[11px]">
        <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
        Market desk · Live coverage
      </div>
      <FeatureLead article={lead} theme={theme} badge="Markets" />
      <div className="mt-8 divide-y divide-ink/10 border-y border-ink/10 sm:mt-10">
        {rest.map((article, i) => (
          <Link
            key={article._id}
            to={`/article/${article.slug}`}
            className="group grid grid-cols-[2.5rem_1fr] gap-2 py-4 sm:grid-cols-[3.5rem_1fr_auto] sm:items-center sm:gap-3 sm:py-5"
          >
            <span className="font-mono text-[12px] text-muted">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="min-w-0 font-display text-base font-semibold tracking-tight text-ink transition-colors group-hover:text-brand sm:text-lg">
              {article.title}
            </h3>
            <span className="col-start-2 font-mono text-[11px] text-muted sm:col-start-auto">
              {formatDate(article.publishedAt)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

/** SPORT — wide lead + bordered cards */
export function SportLayout({ theme, articles }) {
  const [lead, ...rest] = articles
  return (
    <div className={pagePad}>
      <SectionHero theme={theme} count={articles.length} />
      <FeatureLead article={lead} theme={theme} badge="Match desk" />
      <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {rest.map((article) => (
          <Link
            key={article._id}
            to={`/article/${article.slug}`}
            className="group border-2 border-ink bg-paper transition-transform hover:-translate-y-0.5"
          >
            {article.mainImage?.url && (
              <img src={article.mainImage.url} alt="" className="aspect-[16/10] w-full object-cover" loading="lazy" />
            )}
            <div className="p-3.5 sm:p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-brand">
                Sport
              </p>
              <h3 className="mt-1 font-display text-base font-semibold leading-snug tracking-tight sm:text-lg">{article.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

/** WORLD — lead + region rows */
export function WorldLayout({ theme, articles }) {
  const ordered = [...articles].sort((a, b) => Number(Boolean(b.mainImage)) - Number(Boolean(a.mainImage)))
  const [lead, ...rest] = ordered
  const regions = ['Asia', 'Africa', 'Europe', 'Americas', 'Middle East']

  return (
    <div className={pagePad}>
      <SectionHero theme={theme} count={articles.length} />
      <div className="mt-5 flex gap-2 overflow-x-auto pb-1 sm:mt-6 sm:flex-wrap sm:overflow-visible">
        {regions.map((region) => (
          <span
            key={region}
            className="shrink-0 border border-ink/15 px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-wide text-ink/70"
          >
            {region}
          </span>
        ))}
      </div>
      <FeatureLead article={lead} theme={theme} badge="From the wire" />
      <div className="mt-10 sm:mt-14">
        <p className="dot-label mb-2">
          More from abroad
        </p>
        {rest.map((article, i) => (
          <Link
            key={article._id}
            to={`/article/${article.slug}`}
            className="group grid gap-2 border-b border-ink/10 py-4 sm:grid-cols-[6rem_1fr_auto] sm:items-baseline sm:gap-4 sm:py-5"
          >
            <div className="flex items-center justify-between gap-3 sm:contents">
              <span className="font-mono text-[11px] uppercase tracking-wide text-brand">
                {regions[i % regions.length]}
              </span>
              <span className="font-mono text-[11px] text-muted sm:order-last">
                {formatDate(article.publishedAt)}
              </span>
            </div>
            <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-brand sm:text-xl">
              {article.title}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  )
}

/** LIFE — alternating image / text */
export function LifeLayout({ theme, articles }) {
  return (
    <div className="mx-auto max-w-[1000px] px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16">
      <SectionHero theme={theme} count={articles.length} />
      <div className="mt-10 space-y-12 sm:mt-14 sm:space-y-16">
        {articles.map((article, i) => (
          <Link
            key={article._id}
            to={`/article/${article.slug}`}
            className={`group grid items-center gap-5 animate-rise sm:gap-8 md:grid-cols-2 ${
              i % 2 === 1 ? 'md:[&>div:first-child]:order-2' : ''
            }`}
          >
            <div className="overflow-hidden bg-paper-muted">
              {article.mainImage?.url ? (
                <img
                  src={article.mainImage.url}
                  alt=""
                  className="aspect-[5/4] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              ) : (
                <div className="aspect-[5/4]" />
              )}
            </div>
            <div>
              <p className="dot-label">
                Life
              </p>
              <h2 className="mt-3 font-display text-xl font-semibold leading-tight tracking-tight text-ink transition-colors group-hover:text-brand sm:text-2xl md:text-3xl">
                {article.title}
              </h2>
              {article.excerpt && (
                <p className="mt-3 font-mono text-[12px] leading-relaxed text-muted sm:text-[13px]">{article.excerpt}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

const layouts = {
  news: NewsLayout,
  politics: PoliticsLayout,
  opinion: OpinionLayout,
  culture: CultureLayout,
  money: MoneyLayout,
  sport: SportLayout,
  world: WorldLayout,
  life: LifeLayout,
}

export function CategoryLayout({ theme, articles }) {
  const Layout = layouts[theme.layout] || NewsLayout
  return <Layout theme={theme} articles={articles} />
}
