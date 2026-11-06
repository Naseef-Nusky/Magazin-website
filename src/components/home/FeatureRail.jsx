import { Link } from 'react-router-dom'

export default function FeatureRail({ articles = [] }) {
  if (!articles.length) return null
  const loop = [...articles, ...articles]

  return (
    <div className="feature-rail relative -mx-4 overflow-hidden sm:-mx-6 md:-mx-8">
      <div className="feature-rail-track flex w-max gap-3 px-4 will-change-transform sm:gap-4 sm:px-6 md:px-8">
        {loop.map((article, i) => (
          <Link
            key={`${article._id}-rail-${i}`}
            to={`/article/${article.slug}`}
            className="group w-[240px] shrink-0 border border-ink/10 bg-paper sm:w-[280px] md:w-[320px]"
          >
            {article.mainImage?.url && (
              <div className="overflow-hidden">
                <img
                  src={article.mainImage.url}
                  alt=""
                  className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  loading="lazy"
                />
              </div>
            )}
            <div className="p-3.5 sm:p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-brand">
                {article.category?.title}
              </p>
              <h3 className="mt-2 font-display text-[0.95rem] font-semibold leading-snug tracking-tight transition-colors group-hover:text-brand sm:text-[1.05rem]">
                {article.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
