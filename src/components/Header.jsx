import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navCategories, sortCategoriesByNav } from '../data/demoArticles'

export default function Header({
  categories = navCategories,
  activeSlug,
  dark = false,
}) {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const labels = sortCategoriesByNav(categories.length ? categories : navCategories).map(
    (c) =>
      typeof c === 'string'
        ? { title: c, slug: c.toLowerCase() }
        : { title: c.title, slug: c.slug || c.title.toLowerCase() },
  )

  const current =
    activeSlug ||
    (location.pathname.startsWith('/category/')
      ? location.pathname.split('/')[2]
      : null)

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!menuOpen) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const linkClass = (active) =>
    `transition-colors ${
      active
        ? dark
          ? 'text-white'
          : 'text-ink'
        : dark
          ? 'text-white/65 hover:text-white'
          : 'text-ink/55 hover:text-ink'
    }`

  return (
    <header
      className={`sticky top-0 z-40 border-b ${
        dark
          ? 'border-white/10 bg-ink/95 backdrop-blur-md'
          : 'border-ink/10 bg-paper/90 backdrop-blur-md'
      }`}
    >
      {/* Mobile bar */}
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-3 px-4 py-3.5 sm:px-6 md:hidden">
        <Link to="/" className="shrink-0" aria-label="Veridoxa home">
          <img
            src="/logo.png"
            alt="Veridoxa.online"
            className="h-14 w-auto object-contain sm:h-16"
          />
        </Link>

        <button
          type="button"
          className={`flex h-10 w-10 items-center justify-center ${
            dark ? 'text-white' : 'text-ink'
          }`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <nav
          className={`border-t px-4 py-4 md:hidden ${
            dark ? 'border-white/10 bg-ink' : 'border-ink/10 bg-paper'
          }`}
          aria-label="Mobile sections"
        >
          <ul className="mx-auto flex max-w-[1200px] flex-col">
            {labels.map(({ title, slug }) => {
              const active = current === slug
              return (
                <li key={slug} className="border-b border-ink/10 last:border-b-0">
                  <Link
                    to={`/category/${slug}`}
                    className={`block py-3.5 font-display text-[15px] font-medium tracking-tight ${linkClass(active)}`}
                  >
                    {title}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      )}

      {/* Desktop / tablet centered */}
      <div className="mx-auto hidden max-w-[1200px] flex-col items-center gap-4 px-6 py-4 md:flex md:px-8">
        <Link to="/" className="shrink-0" aria-label="Veridoxa home">
          <img
            src="/logo.png"
            alt="Veridoxa.online"
            className="h-20 w-auto object-contain lg:h-24"
          />
        </Link>

        <nav
          className={`flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] font-medium ${
            dark ? 'text-white/65' : 'text-ink/55'
          }`}
          aria-label="Primary"
        >
          {labels.map(({ title, slug }) => {
            const active = current === slug
            return (
              <Link
                key={slug}
                to={`/category/${slug}`}
                className={`whitespace-nowrap py-1 ${linkClass(active)}`}
              >
                {title}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
