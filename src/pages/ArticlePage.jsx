import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PortableText } from '@portabletext/react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { getArticleBySlug, getArticles, getCategories, urlFor } from '../lib/sanity'

const portableComponents = {
  types: {
    image: ({ value }) => {
      const src = value?.url || urlFor(value)
      if (!src) return null
      return (
        <figure className="my-10">
          <img src={src} alt={value.alt || ''} className="w-full object-cover" />
          {value.caption && (
            <figcaption className="mt-3 font-mono text-[12px] text-muted">{value.caption}</figcaption>
          )}
        </figure>
      )
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="mt-12 font-display text-2xl font-semibold tracking-tight text-ink">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 font-display text-xl font-semibold tracking-tight text-ink">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-2 border-brand pl-4 font-display text-lg font-medium leading-snug text-ink/80 sm:my-10 sm:pl-5 sm:text-xl">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="mt-5 text-[1.05rem] leading-[1.75] text-ink/80 sm:mt-6 sm:text-[1.125rem] sm:leading-[1.8]">
        {children}
      </p>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a href={value.href} className="text-brand underline underline-offset-2">
        {children}
      </a>
    ),
  },
}

export default function ArticlePage() {
  const { slug } = useParams()
  const [article, setArticle] = useState(null)
  const [related, setRelated] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    setLoading(true)
    ;(async () => {
      const [a, all, c] = await Promise.all([
        getArticleBySlug(slug),
        getArticles(),
        getCategories(),
      ])
      if (!alive) return
      setArticle(a)
      setCategories(c)
      const more = all
        .filter(
          (x) =>
            x.slug !== slug &&
            (x.category?.slug === a?.category?.slug || x.category?.title === a?.category?.title),
        )
        .slice(0, 3)
      setRelated(
        more.length
          ? more
          : all.filter((x) => x.slug !== slug).slice(0, 3),
      )
      setLoading(false)
      window.scrollTo(0, 0)
    })()
    return () => {
      alive = false
    }
  }, [slug])

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header categories={categories} />

      <main className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-14">
        <Link
          to={article?.category?.slug ? `/category/${article.category.slug}` : '/'}
          className="font-mono text-[12px] uppercase tracking-wide text-muted transition-colors hover:text-brand"
        >
          ← {article?.category?.title || 'Magazin'}
        </Link>

        {loading && (
          <div className="mt-8 space-y-4 sm:mt-10">
            <div className="h-4 w-24 animate-pulse bg-ink/10" />
            <div className="h-14 w-full max-w-3xl animate-pulse bg-ink/10" />
            <div className="media-hero w-full animate-pulse bg-ink/5" />
          </div>
        )}

        {!loading && !article && (
          <div className="mt-16 px-2 text-center sm:mt-20">
            <h1 className="font-display text-2xl font-semibold sm:text-3xl">Story not found</h1>
            <Link to="/" className="mt-4 inline-block font-mono text-sm text-brand hover:underline">
              Return home
            </Link>
          </div>
        )}

        {!loading && article && (
          <>
            <article className="mt-6 animate-rise sm:mt-8">
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  {article.category?.title && (
                    <Link
                      to={`/category/${article.category.slug}`}
                      className="dot-label hover:opacity-80"
                    >
                      {article.category.title}
                    </Link>
                  )}
                  {article.isLive && (
                    <span className="inline-flex items-center gap-1.5 overflow-hidden bg-brand px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-wide text-paper">
                      <span className="relative flex h-1.5 w-1.5 shrink-0 overflow-hidden">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-paper/40" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-paper" />
                      </span>
                      Live
                    </span>
                  )}
                </div>

                <h1 className="mt-4 font-display text-[clamp(1.75rem,7vw,3.25rem)] font-semibold leading-[1.08] tracking-tight sm:mt-5">
                  {article.title}
                </h1>

                {article.excerpt && (
                  <p className="mt-4 font-mono text-[13px] leading-relaxed text-muted sm:mt-5 sm:text-[15px]">
                    {article.excerpt}
                  </p>
                )}

                <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 border-y border-ink/10 py-3.5 font-mono text-[11px] uppercase tracking-wide text-muted sm:mt-6 sm:py-4 sm:text-[12px]">
                  {article.author?.name && <span>By {article.author.name}</span>}
                  {article.publishedAt && (
                    <time dateTime={article.publishedAt}>
                      {new Date(article.publishedAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </time>
                  )}
                </div>
              </div>

              {article.mainImage?.url && (
                <figure className="mt-6 sm:mt-10">
                  <img
                    src={article.mainImage.url}
                    alt={article.mainImage.alt || ''}
                    className="media-hero w-full object-cover"
                  />
                </figure>
              )}

              <div className="mx-auto mt-2 max-w-3xl sm:mt-4">
                {article.body ? (
                  <PortableText value={article.body} components={portableComponents} />
                ) : (
                  <p className="mt-6 text-[1.05rem] leading-[1.75] text-ink/80 sm:text-[1.125rem] sm:leading-[1.8]">
                    {article.excerpt}
                  </p>
                )}
              </div>
            </article>

            {related.length > 0 && (
              <section className="mt-14 border-t border-ink/10 pt-8 sm:mt-20 sm:pt-12">
                <p className="dot-label">More to read</p>
                <h2 className="mt-2 font-display text-xl font-semibold tracking-tight sm:text-2xl">
                  Related stories
                </h2>
                <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
                  {related.map((item) => (
                    <Link
                      key={item._id}
                      to={`/article/${item.slug}`}
                      className="group border border-ink/10 bg-paper transition-colors hover:border-ink/25"
                    >
                      {item.mainImage?.url && (
                        <img
                          src={item.mainImage.url}
                          alt=""
                          className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                          loading="lazy"
                        />
                      )}
                      <div className="p-3.5 sm:p-4">
                        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-brand">
                          {item.category?.title}
                        </p>
                        <h3 className="mt-2 font-display text-[1.05rem] font-semibold leading-snug tracking-tight transition-colors group-hover:text-brand">
                          {item.title}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}
