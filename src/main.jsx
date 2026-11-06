import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { getArticles, getCategories } from './lib/sanity'

// Kick off Sanity reads before React mounts so the homepage paints sooner
void Promise.all([getArticles(), getCategories()])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
