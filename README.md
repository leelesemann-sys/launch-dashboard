# Launch Tracking Dashboard – Prototyp Demo

Pharma Launch Analytics Dashboard mit 7 Tabs: Szenario-Story, Executive Summary, Markt-Uptake & Verordner, Regionale Performance, Financial Deep Dive, Wettbewerb, Szenario-Engine.

Fiktive Daten – Work Sample für Strategic Portfolio Manager Position · Lesemann Consulting © 2026

## Lokal starten

```bash
npm install
npm run dev
```

## Deployment

### Option A: Vercel (empfohlen – einfachster Weg)

1. Repo auf GitHub pushen
2. [vercel.com](https://vercel.com) → "Import Project" → GitHub-Repo auswählen
3. Framework: **Vite** (wird auto-erkannt)
4. Deploy klicken – fertig

Ergebnis: `https://launch-dashboard.vercel.app` (oder Custom Domain)

### Option B: GitHub Pages (automatisch via GitHub Actions)

1. Repo auf GitHub pushen
2. Settings → Pages → Source: **GitHub Actions**
3. Bei jedem Push auf `main` wird automatisch deployed

**Wichtig:** In `vite.config.js` den `base`-Pfad an deinen Repo-Namen anpassen:
```js
// Wenn dein Repo "launch-dashboard" heißt:
base: '/launch-dashboard/'

// Wenn dein Repo anders heißt, z.B. "my-dashboard":
base: '/my-dashboard/'
```

Ergebnis: `https://<username>.github.io/launch-dashboard/`

### Option C: Manuelles Deployment (beliebiger Static Host)

```bash
npm run build          # für Vercel/Netlify/eigener Server
# oder
npm run build:ghpages  # für GitHub Pages (mit base-Pfad)
```

Den Inhalt von `dist/` auf einen beliebigen Static Hosting Service hochladen.

## Tech Stack

- React 18 + Vite 5
- Recharts (Charts)
- Kein CSS-Framework – Inline Styles
