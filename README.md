# Sarita Pharmacy — Medicine Delivery Website

Fast medicine delivery website for **Sarita Pharmacy, Prayagraj**. Built with React + Vite.

## Features

- 🏥 Full-featured pharmacy ordering system via WhatsApp
- 👨‍⚕️ 12 Expert specialist doctors with clinic timings & booking
- 📦 Real-time order tracking with Firestore backend
- 🛵 Home delivery management dashboard (admin panel)
- 📱 PWA-ready with app manifest & icons
- 🎨 Premium dark-theme design with micro-animations
- 📊 SEO optimized with Open Graph & Twitter Card meta

## Tech Stack

- **Frontend:** React 19, Vite 8
- **Styling:** Vanilla CSS-in-JS (inline styles)
- **Backend:** Firebase Firestore (REST API)
- **Fonts:** Outfit, Playfair Display, Noto Sans Devanagari, Plus Jakarta Sans
- **Deployment:** Netlify / Vercel (static site)

## Project Structure

```
sarita-pharmacy/
├── index.html              # Entry HTML with SEO meta tags
├── package.json            # Dependencies & scripts
├── vite.config.js          # Vite configuration
├── public/
│   ├── logo.png            # Favicon & OG image
│   ├── manifest.json       # PWA manifest
│   ├── favicon.svg         # SVG favicon fallback
│   └── icons.svg           # Icon sprite
└── src/
    ├── main.jsx            # React entry point
    ├── App.jsx             # Full application (single-file)
    ├── App.css             # Additional styles
    ├── index.css           # Global CSS reset
    └── assets/
        └── logo.png        # Brand logo (source of truth)
```

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

### Netlify
1. Push to GitHub
2. Go to [netlify.com](https://netlify.com) → "New site from Git"
3. Select your repo
4. Build settings are auto-detected:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click "Deploy"

### Vercel
1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → "New Project"
3. Import your repo
4. Framework is auto-detected (Vite)
5. Click "Deploy"

## License

Private project — All rights reserved.
