# Jaskaran Website — Project Notes

Personal site with two intentionally separate halves: a professional resume site and a personal "casual" site. They are not the same page reskinned — they're different sites that link to each other.

## Structure

```
index.html          Professional resume (single page)
styles.css           Professional theme (dark navy/blue, Space Grotesk + Inter)
script.js             Professional page JS: certifications carousel + footer year

casual/
  index.html          Casual "about me as a person" landing page
  hobbies.html         Hobbies grid
  interests.html       Interests / currently into / tag cloud / quote
  fitness.html          Stats, progress bars, goals
  blog.html              Blog post grid (placeholder posts)
  styles.css             Casual theme (warm cream/orange, Fredoka + Inter)
  script.js                Mobile nav toggle + optional WordPress blog fetch
```

## Key design decisions

- **No in-place theme toggle.** Originally the casual mode was a text/CSS swap on the same page. That was replaced: casual is now its own multi-page site under `casual/`. The header "switch" on each site is just a styled `<a>` link — Professional → `casual/index.html`, Casual → `../index.html`. It's decorative CSS (a toggle-look pill) wrapped in a link, not JS state.
- **Certifications carousel** lives in `index.html` inside the Education & Skills section (`.cert-block`). It's a real horizontal slideshow: prev/next buttons, dot nav, keyboard arrows, autoplay (pauses on hover/focus). Logic in `script.js` under `[data-carousel]`. Slides are placeholder CompTIA certs — edit the `.cert-slide` markup directly to add real ones.
- **Blog → WordPress path**: `casual/blog.html` has static placeholder post cards inside `[data-blog-grid]`. `casual/script.js` has a `WORDPRESS_API_URL` constant — set it to a WordPress site's base URL and the script fetches `/wp-json/wp/v2/posts` and replaces the placeholder cards with live posts automatically. Leave it empty and the static cards just get hand-edited like any other page.

## Current state / what's still placeholder

Jaskaran has started personalizing `index.html` directly (RMIT Bachelor of Computer Science 2026–2029, Nossal High School 2022–2025, cert badges marked "COMING SOON!" for A+/Network+/Security+ while ITF+ is presumably done/in progress). Still placeholder or unconfirmed:
- Work Experience section (Company Name Here, Freelance, TA role) — likely needs real entries or removal if not applicable yet given RMIT starts 2026
- Contact info (email, phone, LinkedIn, GitHub, resume PDF link) — still `your.email@example.com` etc. in both `index.html` and every `casual/*.html` footer
- All of `casual/` — hobbies, interests, fitness stats, and bio are generic placeholders, not yet personalized
- Cert dates/credential IDs — "Month Year" / "XXXXXXXX" placeholders throughout

## How to pick this up on a new machine

This file exists so a fresh Claude Code session (e.g. opened on a different computer once OneDrive syncs this folder) has full context without re-explaining. Just open the project folder and continue — no separate export needed.
