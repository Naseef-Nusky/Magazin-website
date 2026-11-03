import { Link } from 'react-router-dom'
import { navCategories } from '../data/demoArticles'

export default function Footer({ flush = false }) {
  const year = new Date().getFullYear()

  return (
    <footer className={flush ? '' : 'mt-[clamp(56px,10vw,120px)]'}>
      {/* Masthead band */}
      <div className="border-t border-ink/10 bg-paper-muted">
        <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <div className="max-w-xl">
              <p className="dot-label">Free to read</p>
              <Link
                to="/"
                className="mt-4 block font-display text-[clamp(2.5rem,8vw,5rem)] font-semibold leading-[0.92] tracking-tight text-ink transition-colors hover:text-brand"
              >
                Magazin
              </Link>
              <p className="mt-5 max-w-md font-mono text-[13px] leading-relaxed text-muted sm:text-sm">
                Open minds, open access. A free digital magazine — no login, no
                paywall, no noise.
              </p>
            </div>

            <div className="shrink-0">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                Sections
              </p>
              <nav
                className="mt-4 grid grid-cols-2 gap-x-10 gap-y-2.5 sm:grid-cols-4 lg:grid-cols-2"
                aria-label="Footer sections"
              >
                {navCategories.map((title) => (
                  <Link
                    key={title}
                    to={`/category/${title.toLowerCase()}`}
                    className="font-display text-base font-medium tracking-tight text-ink transition-colors hover:text-brand sm:text-lg"
                  >
                    {title}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-4 border-t border-ink/10 pt-8 sm:mt-16 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-[12px] leading-relaxed text-muted">
              Journalism for curious readers. Published daily.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.12em] text-brand transition-transform hover:translate-x-0.5"
            >
              Back to top stories
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Burgundy bar */}
      <div className="bg-brand text-paper">
        <div className="mx-auto max-w-[1200px] px-4 py-5 text-center sm:px-6 md:px-8">
          <p className="font-mono text-[11px] tracking-wide text-paper/80">
            © {year} Magazin. Free to read.
          </p>
        </div>
      </div>
    </footer>
  )
}
