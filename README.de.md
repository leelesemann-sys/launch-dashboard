# Pharma Launch Tracking Dashboard

> **Sprache:** [English](README.md) | Deutsch

Interaktives Pharma-Launch-Analytics-Dashboard mit 6 Tabs: Executive Summary, Market Uptake & Prescribers, Regional Performance, Financial Deep Dive, Competition und Scenario Engine.

**Live-Demo:** [launch-dashboard-beta.vercel.app](https://launch-dashboard-beta.vercel.app)

> Alle Daten sind fiktiv und dienen ausschließlich Demonstrationszwecken.

![React](https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646cff?logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

## Funktionen

- **Executive Summary** — KPIs, TRx-Prognosekorridor, Meilensteine, Nettoumsatz vs. Plan
- **Market Uptake & Prescribers** — NRx/RRx-Dynamik, einzigartige Verordner, Persistenz (MPR), Marktanteile
- **Regional Performance** — KV-Regionen-Tabelle, Pareto-Analyse, Außendienst vs. Marktanteil-Scatter
- **Financial Deep Dive** — Preiswasserfall, Revenue Bridge, Gross-to-Net, Szenariovergleich
- **Competition** — Marktanteilstrends, Head-to-Head, Wettbewerber-Event-Timeline
- **Scenario Engine** — Interaktive What-If-Simulation mit Sensitivitätsanalyse

Zwei Produktschienen: **Cardiozan** (Kardiologie) und **Neurolix** (ZNS/TRD).

## Erste Schritte

```bash
npm install
npm run dev
```

Öffnen Sie `http://localhost:5173` in Ihrem Browser.

## Deployment

### Vercel (empfohlen)

1. Repository auf GitHub pushen
2. [vercel.com](https://vercel.com) → Import Project → GitHub-Repo auswählen
3. Framework: **Vite** (automatisch erkannt)
4. Deploy

### GitHub Pages (automatisch via GitHub Actions)

1. Repository auf GitHub pushen
2. Settings → Pages → Source: **GitHub Actions**
3. Wird automatisch bei jedem Push auf `main` deployed

**Hinweis:** Der `base`-Pfad in `vite.config.js` muss mit Ihrem Repo-Namen übereinstimmen:
```js
base: isGitHubPages ? '/launch-dashboard/' : '/'
```

### Manueller Build

```bash
npm run build          # für Vercel/Netlify/jeden statischen Host
npm run build:ghpages  # für GitHub Pages (mit Base-Pfad)
```

Laden Sie den Inhalt von `dist/` auf einen beliebigen statischen Hosting-Dienst hoch.

## Tech Stack

- React 18 + Vite 5
- Recharts (Diagramme)
- Kein CSS-Framework — Inline-Styles

## Lizenz

MIT — siehe [LICENSE](LICENSE) für Details.
