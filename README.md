# Riad Baytamouni — Portfolio

Personal portfolio website: bilingual **English / Arabic (full RTL)**, dark/light mode, pure static — no frameworks, no build step.

**Live:** https://riadbaytamouni.github.io

## Features

- 🌐 EN/AR toggle — Arabic mode flips the entire layout to RTL (`dir="rtl"`) with the Cairo font and full Modern Standard Arabic translations
- 🌙 Dark mode by default, with a light mode toggle (in-memory, no localStorage)
- 📱 Mobile-first responsive design
- ✨ Scroll-reveal animations via IntersectionObserver (respects `prefers-reduced-motion`)
- 🔍 SEO: meta description, Open Graph tags, JSON-LD Person schema, semantic HTML

## Files

| File | Purpose |
|---|---|
| `index.html` | All content (English) with `data-i18n` keys |
| `style.css` | Design system — tokens, dark/light themes, RTL-safe logical properties |
| `script.js` | Arabic translations, language/theme toggles, scroll reveal, copy-email |
| `cv.pdf` | **Your CV — drop it here with exactly this name** |
| `profile.jpg` | **Your photo — drop it here with exactly this name** (square, ~640×640px recommended; section hides itself if missing) |

## Deploy to GitHub Pages

1. Create a new GitHub repository named exactly: **`riadbaytamouni.github.io`**
2. Push the files:
   ```bash
   git init
   git add .
   git commit -m "Portfolio website"
   git branch -M main
   git remote add origin https://github.com/riadbaytamouni/riadbaytamouni.github.io.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Source: Deploy from a branch → main / (root) → Save**
4. Within a minute or two the site is live at **https://riadbaytamouni.github.io**

## Before going live

- Replace every `USERNAME` placeholder in `index.html` (project GitHub links + contact GitHub link) with your GitHub username.
- Add `cv.pdf` and `profile.jpg` to the repo root.

## Run locally

Just open `index.html` in a browser, or:

```bash
python -m http.server 8000
```

then visit http://localhost:8000
