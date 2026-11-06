import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

// Load root .env so Studio uses the same project as the website
try {
  const envPath = resolve(process.cwd(), '.env')
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) continue
    const i = trimmed.indexOf('=')
    const key = trimmed.slice(0, i)
    const value = trimmed.slice(i + 1)
    if (!process.env[key]) process.env[key] = value
  }
} catch {
  // .env optional when vars are already set
}

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ||
  process.env.VITE_SANITY_PROJECT_ID ||
  'cm10f4zr'
const dataset =
  process.env.SANITY_STUDIO_DATASET ||
  process.env.VITE_SANITY_DATASET ||
  'production'

export default defineConfig({
  name: 'veridoxa',
  title: 'Veridoxa Studio',
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
})
