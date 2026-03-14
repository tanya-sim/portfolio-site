/**
 * Dark / Light mode toggle
 * Switches icon between moon (dark mode) and sun (light mode).
 */
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('toggleMode');
  if (!btn) return;

  const icon = btn.querySelector('.toggle-mode__icon');

  btn.addEventListener('click', () => {
    const isDark = btn.dataset.mode === 'dark';
    btn.dataset.mode = isDark ? 'light' : 'dark';
    icon.src = isDark ? 'assets/icon-sun.svg' : 'assets/icon-moon.svg';
    document.body.classList.toggle('light-mode', !isDark);
  });

  btn.addEventListener('mouseenter', () => {
    if (btn.dataset.mode === 'light') {
      icon.src = 'assets/icon-sun-hover.svg';
    }
  });
  btn.addEventListener('mouseleave', () => {
    if (btn.dataset.mode === 'light') {
      icon.src = 'assets/icon-sun.svg';
    }
  });
});

/**
 * Scroll animation engine using IntersectionObserver.
 * Mirrors the Framer Motion whileInView logic from the Figma Make file.
 */

const observerOptions = {
  root: null,
  rootMargin: '-100px',
  threshold: 0
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      // once: true — stop observing after first trigger
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all animated elements on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll(
    '.anim-from-left, .anim-from-right, .anim-from-bottom, ' +
    '.anim-scale-center, .anim-unfold-x, .anim-clip-reveal, ' +
    '.anim-card-left, .anim-card-right, .anim-card-up, ' +
    '.anim-title-expand'
  ).forEach(el => observer.observe(el));
});
