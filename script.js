(() => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Top-of-page hint: appears 5s after load, only while scrolled to top
  const scrollHint = document.querySelector('[data-scroll-hint]');
  if (scrollHint) {
    let hintArmed = false;

    const updateScrollHint = () => {
      if (!hintArmed) return;
      scrollHint.classList.toggle('is-visible', window.scrollY <= 24);
    };

    window.addEventListener('scroll', updateScrollHint, { passive: true });
    window.addEventListener('load', () => {
      setTimeout(() => {
        hintArmed = true;
        updateScrollHint();
      }, 5000);
    });
  }

  // ---- Certifications carousel -------------------------------------
  const carousel = document.querySelector('[data-carousel]');
  if (!carousel) return;

  const track = carousel.querySelector('[data-carousel-track]');
  const slides = Array.from(track.children);
  const prevBtn = carousel.querySelector('[data-carousel-prev]');
  const nextBtn = carousel.querySelector('[data-carousel-next]');
  const dotsWrap = carousel.parentElement.querySelector('[data-carousel-dots]');

  let index = 0;
  let autoplayId = null;

  const dots = slides.map((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'cert-dot';
    dot.setAttribute('aria-label', `Go to certification ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
    return dot;
  });

  function render() {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, i) => dot.setAttribute('aria-current', String(i === index)));
  }

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    render();
  }

  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  function startAutoplay() {
    stopAutoplay();
    autoplayId = setInterval(next, 6000);
  }

  function stopAutoplay() {
    if (autoplayId) clearInterval(autoplayId);
  }

  nextBtn.addEventListener('click', () => { next(); startAutoplay(); });
  prevBtn.addEventListener('click', () => { prev(); startAutoplay(); });

  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);
  carousel.addEventListener('focusin', stopAutoplay);
  carousel.addEventListener('focusout', startAutoplay);

  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { next(); startAutoplay(); }
    if (e.key === 'ArrowLeft') { prev(); startAutoplay(); }
  });

  render();
  startAutoplay();
})();
