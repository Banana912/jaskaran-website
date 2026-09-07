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

- **Top-of-page hint** (`index.html`, `.top-hint` / `[data-scroll-hint]`): a playful arrow + line of text nudging visitors toward the casual-site switch. Hidden by default; JS in `script.js` waits for `window.load` + a 5s delay, then shows it — and only while scrolled within 24px of the top (hides again on scroll, reappears on scroll-back-up). Deliberately delayed so it doesn't compete with the hero copy on first paint.

## Current state / what's still placeholder

`index.html` is personalized: RMIT Bachelor of Computer Science (2026–2029), Nossal High School (2022–2025), real Work Experience entries (UX/UI Web Designer for Dr Naba Alfayadh; Home Labs and Projects), real footer contact (`contact@itsjaskaran.com`, LinkedIn, GitHub). Still placeholder or unconfirmed:
- Cert dates/credential IDs — "Month Year" / "XXXXXXXX" placeholders throughout, and A+/Network+/Security+ still marked "COMING SOON!"
- All of `casual/` — hobbies, interests, fitness stats are still generic placeholders; footer LinkedIn link there is still `yourprofile`
- Root also has files not part of the documented structure — `style.css`, `index.js` (an older dark-purple/Poppins theme with a JS theme toggle, contradicting the current "no toggle" decision), `data.docx`, `hqdefault.jpg`, `179310.png`, `Projects/sites.html`. Left alone intentionally (2026-08-23) — not cleaned up yet.

## Deployment plan (started 2026-09-07)

- **GitHub**: repo pushes as `Banana912` — this machine has two SSH keys (`~/.ssh/id_ed25519` for a separate university account, `~/.ssh/personalKey` for Banana912). This repo's `core.sshCommand` is set locally to force `personalKey` so pushes always go out as Banana912 regardless of the global default key.
- **Domain**: `itsjaskaran.com`, registered/managed on Cloudflare (nameservers `nicole.ns.cloudflare.com` / `porter.ns.cloudflare.com`). Cloudflare Email Routing is already live for it (MX + SPF configured) — that's what makes `contact@itsjaskaran.com` work. No A/CNAME web records existed yet as of 2026-09-07.
- **`CNAME` file** at repo root already contains `itsjaskaran.com` for GitHub Pages.
- **Remaining steps** (need the user's own GitHub/Cloudflare dashboards):
  1. Create an empty `Banana912/jaskaran-website` repo on GitHub (public — Pages needs a public repo on the free plan), then have Claude push this repo to it.
  2. Repo Settings → Pages → Source: Deploy from branch → `main` / `/ (root)`.
  3. Same Pages settings → Custom domain → `itsjaskaran.com` (the `CNAME` file already in the repo satisfies this).
  4. In Cloudflare DNS for `itsjaskaran.com`, add (DNS-only / grey-cloud, at least until the HTTPS cert issues):
     - Four `A` records on `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
     - `CNAME` on `www` → `banana912.github.io`
  5. Once GitHub shows the domain verified, tick "Enforce HTTPS" in Pages settings.
- **WordPress**: starting from scratch (as of 2026-09-07). `casual/script.js`'s `WORDPRESS_API_URL` already expects a standard WP REST API at `<url>/wp-json/wp/v2/posts`. Lowest-friction option: a free WordPress.com blog (no hosting to manage) — but verify its REST API allows cross-origin `fetch()` from `itsjaskaran.com` once it exists; WordPress core doesn't send permissive CORS headers by default for arbitrary external origins, so a self-hosted WP may need a small CORS allowance (plugin, or a filter on `rest_send_cors_headers`) if the fetch gets blocked in the browser console.

## How to pick this up on a new machine

This file exists so a fresh Claude Code session (e.g. opened on a different computer once OneDrive syncs this folder) has full context without re-explaining. Just open the project folder and continue — no separate export needed.
