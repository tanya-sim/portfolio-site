/**
 * Pulse Doc Case Study — modal viewer for wireframe images
 */
document.addEventListener('DOMContentLoaded', () => {
  const modalEl   = document.getElementById('wfModal');
  const closeBtn  = document.getElementById('wfModalClose');
  const prevBtn   = document.getElementById('wfModalPrev');
  const nextBtn   = document.getElementById('wfModalNext');
  const titleEl   = document.getElementById('wfModalTitle');
  const descEl    = document.getElementById('wfModalDesc');
  const imgEl     = document.getElementById('wfModalImg');

  /* ── Modal data by flow ──────────────────────────────────────── */
  const modalData = {
    flow1: [
      {
        title: 'Prototype Flow 1: Homepage',
        desc: 'Promo tiles: Get Started, Components, Foundation',
        image: 'assets/cs-doc-wireframe-home1.png'
      },
      {
        title: 'Prototype Flow 1: Components Overview',
        desc: 'Side navigation tree: components grouped by categories. Each component branches into Web, iOS and Android guidance.',
        image: 'assets/cs-doc-wireframe-comlanding1.png'
      },
      {
        title: 'Prototype Flow 1: Web Button',
        desc: 'Tabbed navigation across the page: Usage, Code, Accessibility, Content, Change log.',
        image: 'assets/cs-doc-wireframe-compage1.png'
      }
    ],
    flow2: [
      {
        title: 'Prototype Flow 2: Homepage',
        desc: 'Promo tiles designed to guide different user groups (designers vs. engineers) to role-specific content.',
        image: 'assets/cs-doc-wireframe-home2.png'
      },
      {
        title: 'Prototype Flow 2: Components Matrix',
        desc: 'Left side navigation: segmented control for Web, iOS and Android components.',
        image: 'assets/cs-doc-wireframe-comlanding2.png'
      },
      {
        title: 'Prototype Flow 2: Web Button',
        desc: 'A right-aligned third-tier navigation provides a table of contents, enabling quick access to page sections via anchor links.',
        image: 'assets/cs-doc-wireframe-compage2.png'
      }
    ],
    flow3: [
      {
        title: 'Prototype Flow 3: Homepage',
        desc: 'Promo tiles: Web, iOS and Android to route users to specific platform from the get-go.',
        image: 'assets/cs-doc-wireframe-home3.png'
      },
      {
        title: 'Prototype Flow 3: Get Started',
        desc: 'Platform-specific Get Started pages act as entry points to Components, Patterns, and supporting Resources.',
        image: 'assets/cs-doc-wireframe-comlanding3.png'
      },
      {
        title: 'Prototype Flow 3: Web Button',
        desc: 'An expanded component menu slides into view. Tabbed navigation in the main section enables quick switching between Usage, Code, Accessibility, Content, and Changelog.',
        image: 'assets/cs-doc-wireframe-compage3.png'
      }
    ]
  };

  let currentGroup = null;
  let currentIndex = 0;

  /* ── Helpers ──────────────────────────────────────────────────── */
  function show(group, index) {
    currentGroup = group;
    currentIndex = index;
    const items = modalData[group];
    const item  = items[index];

    titleEl.textContent = item.title;
    descEl.textContent  = item.desc;
    imgEl.src           = item.image;
    imgEl.alt           = item.title;

    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === items.length - 1;

    modalEl.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    modalEl.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function navigate(dir) {
    const items = modalData[currentGroup];
    const next  = currentIndex + dir;
    if (next < 0 || next >= items.length) return;
    show(currentGroup, next);
  }

  /* ── Event listeners ──────────────────────────────────────────── */
  document.querySelectorAll('.cs-img-row__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.dataset.wfGroup;
      const index = parseInt(btn.dataset.wfIndex, 10);
      show(group, index);
    });
  });

  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', () => navigate(-1));
  nextBtn.addEventListener('click', () => navigate(1));

  modalEl.addEventListener('click', e => {
    if (e.target === modalEl) close();
  });

  document.addEventListener('keydown', e => {
    if (!modalEl.classList.contains('is-open')) return;
    if (e.key === 'Escape')     close();
    if (e.key === 'ArrowLeft')  navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });
});
