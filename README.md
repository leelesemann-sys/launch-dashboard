# Pharma Launch Tracking Dashboard

Interactive Pharma Launch Analytics Dashboard with 6 tabs: Executive Summary, Market Uptake & Prescribers, Regional Performance, Financial Deep Dive, Competition, and Scenario Engine.

**Live Demo:** [launch-dashboard-beta.vercel.app](https://launch-dashboard-beta.vercel.app)

> All data is fictitious and for demonstration purposes only.

![React](https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646cff?logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

## Features

- **Executive Summary** — KPIs, TRx forecast corridor, milestones, net revenue vs. plan
- **Market Uptake & Prescribers** — NRx/RRx dynamics, unique prescribers, persistence (MPR), market shares
- **Regional Performance** — KV region table, Pareto analysis, field force vs. market share scatter
- **Financial Deep Dive** — Price waterfall, revenue bridge, gross-to-net, scenario comparison
- **Competition** — Market share trends, head-to-head, competitor event timeline
- **Scenario Engine** — Interactive what-if simulation with sensitivity analysis

Two product tracks: **Cardiozan** (cardiology) and **Neurolix** (CNS/TRD).

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Deployment

### Vercel (recommended)

1. Push repo to GitHub
2. [vercel.com](https://vercel.com) → Import Project → select GitHub repo
3. Framework: **Vite** (auto-detected)
4. Deploy

### GitHub Pages (automatic via GitHub Actions)

1. Push repo to GitHub
2. Settings → Pages → Source: **GitHub Actions**
3. Deploys automatically on every push to `main`

**Note:** The `base` path in `vite.config.js` must match your repo name:
```js
base: isGitHubPages ? '/launch-dashboard/' : '/'
```

### Manual Build

```bash
npm run build          # for Vercel/Netlify/any static host
npm run build:ghpages  # for GitHub Pages (with base path)
```

Upload the contents of `dist/` to any static hosting service.

## Tech Stack

- React 18 + Vite 5
- Recharts (charts)
- No CSS framework — inline styles

## License

MIT — see [LICENSE](LICENSE) for details.
