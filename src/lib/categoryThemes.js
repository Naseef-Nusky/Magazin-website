/**
 * Section layouts on shared Magazin paper (Burgundy + White).
 * Accents stay on-brand so every page matches the global palette.
 */
const BRAND = '#7a1f2b'

export const categoryThemes = {
  news: {
    layout: 'news',
    label: 'News',
    tagline: 'What happened — straight and clear.',
    accent: BRAND,
  },
  politics: {
    layout: 'politics',
    label: 'Politics',
    tagline: 'Power, policy, and the people who shape both.',
    accent: BRAND,
  },
  opinion: {
    layout: 'opinion',
    label: 'Opinion',
    tagline: 'Arguments worth reading twice.',
    accent: BRAND,
  },
  culture: {
    layout: 'culture',
    label: 'Culture',
    tagline: 'Film, music, books, and the ideas between them.',
    accent: BRAND,
  },
  money: {
    layout: 'money',
    label: 'Money',
    tagline: 'Markets, work, and what things really cost.',
    accent: BRAND,
  },
  sport: {
    layout: 'sport',
    label: 'Sport',
    tagline: 'Scores, stories, and the roar after.',
    accent: BRAND,
  },
  world: {
    layout: 'world',
    label: 'World',
    tagline: 'Dispatches from beyond the UK.',
    accent: BRAND,
  },
  life: {
    layout: 'life',
    label: 'Life',
    tagline: 'Home, health, habits, and the in-between.',
    accent: BRAND,
  },
}

export function getCategoryTheme(slug) {
  return (
    categoryThemes[slug] || {
      layout: 'news',
      label: slug?.charAt(0).toUpperCase() + slug?.slice(1) || 'Section',
      tagline: 'Stories from Magazin.',
      accent: BRAND,
    }
  )
}
