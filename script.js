/**
 * Hamburger menu toggle
 */
document.addEventListener('DOMContentLoaded', () => {
  const btn  = document.getElementById('hamburgerBtn');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  function openMenu() {
    menu.classList.add('is-open');
    menu.setAttribute('aria-hidden', 'false');
    btn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', () => {
    menu.classList.contains('is-open') ? closeMenu() : openMenu();
  });

  // Close button (X)
  const closeBtn = document.getElementById('mobileClose');
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  // Close when tapping the scrim (outside the panel)
  menu.addEventListener('click', (e) => {
    if (!e.target.closest('.mobile-menu__panel')) closeMenu();
  });

  // Close when a link is tapped
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
});

/**
 * Dark / Light mode toggle
 * data-mode="light" = currently light, moon icon shown (click → go dark)
 * data-mode="dark"  = currently dark,  sun icon shown  (click → go light)
 */
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('toggleMode');
  if (!btn) return;
  const icon = btn.querySelector('.toggle-mode__icon');

  function applyMode(mode) {
    const isDark = mode === 'dark';
    btn.dataset.mode = mode;
    document.body.classList.toggle('dark-mode', isDark);
    icon.src = isDark ? 'assets/icon-sun.svg' : 'assets/icon-moon.svg';
    localStorage.setItem('colorMode', mode);
  }

  // Restore saved preference
  const saved = localStorage.getItem('colorMode');
  if (saved) applyMode(saved);

  btn.addEventListener('click', () => {
    applyMode(btn.dataset.mode === 'light' ? 'dark' : 'light');
  });

  // Hover: brighten sun icon when in dark mode
  btn.addEventListener('mouseenter', () => {
    if (btn.dataset.mode === 'dark') icon.src = 'assets/icon-sun-hover.svg';
  });
  btn.addEventListener('mouseleave', () => {
    if (btn.dataset.mode === 'dark') icon.src = 'assets/icon-sun.svg';
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
