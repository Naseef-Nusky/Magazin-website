# Magazin design system

> Theme **4 · Burgundy + White**. Macrostructure: **Feature Stack**.

## Northstar

Clean white canvas, deep burgundy accent, geometric sans. Typographic hero first; photography carries stories below. Sharp, editorial, high-contrast.

## Colors

| Token | Hex | Role |
|---|---|---|
| `--color-paper` | `#ffffff` | white page background |
| `--color-paper-muted` | `#f4f1ef` | muted surfaces |
| `--color-ink` | `#1a1214` | primary text |
| `--color-brand` | `#7a1f2b` | burgundy accent / dots / active |
| `--color-accent` | `#4c1018` | deeper burgundy (secondary) |
| `--color-muted` | `#6e6466` | secondary text |

## Typography

- **Display / UI:** Space Grotesk (geometric sans, tight tracking)
- **Meta / labels:** IBM Plex Mono
- H1 ~ clamp(2.75rem, 6vw, 4.5rem), weight 500, letter-spacing -0.04em
- Body 16px / 1.5
- Captions 12–13px mono uppercase tracking

## Signature

Burgundy circle (≈8px) before section labels.

## Spacing

Base 4px. Section seams: `clamp(72px, 10vw, 120px)`. Container max `1200px`, inline padding ≥24px.

## Radius

Prefer sharp editorial: `0`–`4px` on controls; images `2px`. Avoid pill-heavy UI.

## Layout

1. Sticky minimal nav  
2. Typographic hero (dot + label + big title + mono subhead)  
3. Feature stack: lead story → opinion strip → also-today → picture desk  
