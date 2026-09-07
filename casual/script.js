(() => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Mobile nav toggle --------------------------------------------
  const navToggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('.nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // ---- Blog posts: optional WordPress REST API integration ----------
  // Point this at a WordPress site (self-hosted or WordPress.com) to pull
  // posts in live instead of editing the placeholder cards in blog.html by hand.
  // Example: 'https://blog.yourdomain.com' (must expose /wp-json/wp/v2/posts).
  const WORDPRESS_API_URL = '';

  const blogGrid = document.querySelector('[data-blog-grid]');
  if (!blogGrid || !WORDPRESS_API_URL) return;

  fetch(`${WORDPRESS_API_URL.replace(/\/$/, '')}/wp-json/wp/v2/posts?_embed&per_page=6`)
    .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
    .then((posts) => {
      if (!Array.isArray(posts) || posts.length === 0) return;

      blogGrid.innerHTML = posts.map((post) => {
        const date = new Date(post.date).toLocaleDateString(undefined, {
          year: 'numeric', month: 'short', day: 'numeric',
        });
        const excerpt = post.excerpt?.rendered?.replace(/<[^>]+>/g, '').trim() ?? '';
        const image = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;

        return `
          <article class="blog-card">
            <div class="blog-card-image" ${image ? `style="background-image:url('${image}');background-size:cover;background-position:center;"` : ''}>
              ${image ? '' : '📝'}
            </div>
            <div class="blog-card-body">
              <p class="blog-card-date">${date}</p>
              <h3>${post.title.rendered}</h3>
              <p>${excerpt}</p>
              <a class="blog-card-link" href="${post.link}" target="_blank" rel="noopener noreferrer">Read more →</a>
            </div>
          </article>
        `;
      }).join('');
    })
    .catch(() => {
      // Leave the static placeholder posts in place if the fetch fails.
    });
})();
