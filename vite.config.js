import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// For GitHub Pages: set base to your repo name
// For Vercel: leave as '/'
// Toggle by setting GITHUB_PAGES=true in env or change manually
const isGitHubPages = process.env.GITHUB_PAGES === 'true'

export default defineConfig({
  plugins: [react()],
  base: isGitHubPages ? '/launch-dashboard/' : '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
