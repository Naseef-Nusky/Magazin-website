export default function CategoryLabel({ children, tone = 'accent' }) {
  if (!children) return null

  if (tone === 'live') {
    return (
      <span className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-white">
        {children}
      </span>
    )
  }

  return (
    <span className="dot-label text-[11px]">
      {children}
    </span>
  )
}
