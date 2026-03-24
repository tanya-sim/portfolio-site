/**
 * CVS Case Study — modal viewer for phone screenshots
 */
document.addEventListener('DOMContentLoaded', () => {
  const modalEl      = document.getElementById('csModal');
  const scrim        = modalEl.querySelector('.cs-modal__scrim');
  const closeBtn     = document.getElementById('modalClose');
  const prevBtn      = document.getElementById('modalPrev');
  const nextBtn      = document.getElementById('modalNext');
  const screenTitle  = document.getElementById('modalScreenTitle');
  const phoneImg     = document.getElementById('modalPhoneImg');
  const compTitle    = document.getElementById('modalCompTitle');
  const compDesc     = document.getElementById('modalCompDesc');
  const detailImg    = document.getElementById('modalDetailImg');

  /* ── Modal data by group ──────────────────────────────────────── */
  const modalData = {
    main: [
      {
        screenTitle: 'Home Screen',
        compTitle: 'Android Card Component',
        compDesc: 'A card with a slotted architecture offers great flexibility for building custom layouts.',
        image: 'assets/cs-main-homepage.png',
        detailImage: 'assets/cs-detail-card.png'
      },
      {
        screenTitle: 'Savings Screen',
        compTitle: 'Android Tabs Component',
        compDesc: 'Tabs organize content across different screens and views.',
        image: 'assets/cs-main-shopsave.png',
        detailImage: 'assets/cs-detail-tabs.png'
      },
      {
        screenTitle: 'Your Health Screen',
        compTitle: 'Android List Component',
        compDesc: 'Lists support quick scanning and action by keeping items short and logically ordered.',
        image: 'assets/cs-main-health.png',
        detailImage: 'assets/cs-detail-list.png'
      }
    ],
    shopping: [
      {
        screenTitle: 'Delivery options',
        compTitle: 'Android Choice Button Component',
        compDesc: 'A choice button is a custom control that supports single or multiple selection.',
        image: 'assets/cs-shopping-1.png',
        detailImage: 'assets/cs-shopping-detail-1.png'
      },
      {
        screenTitle: 'Product recommendations',
        compTitle: 'Android Button Component',
        compDesc: 'Buttons provide a clear and consistent way to trigger actions.',
        image: 'assets/cs-shopping-2.png',
        detailImage: 'assets/cs-shopping-detail-2.png'
      },
      {
        screenTitle: 'Checkout',
        compTitle: 'Android Bottom Sheet Component',
        compDesc: 'Bottom sheets present secondary content from the bottom of the screen.',
        image: 'assets/cs-shopping-3.png',
        detailImage: 'assets/cs-shopping-detail-3.png'
      }
    ],
    health1: [
      {
        screenTitle: 'Delivery options',
        compTitle: 'Android Important Note Component',
        compDesc: 'An important note is a system feedback message that highlights additional contextual information.',
        image: 'assets/cs-health-1.png',
        detailImage: 'assets/cs-health-detail-1.png'
      },
      {
        screenTitle: 'Product recommendations',
        compTitle: 'Android Action List and Checkbox Components',
        compDesc: 'Lists help people find a specific item and act on it.',
        image: 'assets/cs-health-2.png',
        detailImage: 'assets/cs-health-detail-2.png'
      },
      {
        screenTitle: 'Checkout',
        compTitle: 'Android Choice Button Group Component',
        compDesc: 'A choice button is a custom control that supports single or multiple selection.',
        image: 'assets/cs-health-3.png',
        detailImage: 'assets/cs-health-detail-3.png'
      }
    ],
    health2: [
      {
        screenTitle: 'Delivery options',
        compTitle: 'Android Chip Component',
        compDesc: 'Chips provide a compact way to support input, selection, filtering, and actions.',
        image: 'assets/cs-health-4.png',
        detailImage: 'assets/cs-health-detail-4.png'
      },
      {
        screenTitle: 'Product recommendations',
        compTitle: 'Android Dialog Component',
        compDesc: 'Dialogs present important prompts within a user flow.',
        image: 'assets/cs-health-5.png',
        detailImage: 'assets/cs-health-detail-5.png'
      },
      {
        screenTitle: 'Checkout',
        compTitle: 'Android Date Picker Component',
        compDesc: 'Date pickers let users select a date or a range of dates.',
        image: 'assets/cs-health-6.png',
        detailImage: 'assets/cs-health-detail-6.png'
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

    screenTitle.textContent = item.screenTitle;
    phoneImg.src            = item.image;
    phoneImg.alt            = item.screenTitle;
    compTitle.textContent   = item.compTitle;
    compDesc.textContent    = item.compDesc;
    detailImg.src           = item.detailImage;

    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === items.length - 1;

    modalEl.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function close() {
    modalEl.hidden = true;
    document.body.style.overflow = '';
  }

  function navigate(dir) {
    const items = modalData[currentGroup];
    const next  = currentIndex + dir;
    if (next >= 0 && next < items.length) {
      show(currentGroup, next);
    }
  }

  /* ── Event listeners ──────────────────────────────────────────── */
  document.querySelectorAll('.cs-phone-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.dataset.modalGroup;
      const index = parseInt(btn.dataset.modalIndex, 10);
      show(group, index);
    });
  });

  closeBtn.addEventListener('click', close);
  scrim.addEventListener('click', close);
  prevBtn.addEventListener('click', () => navigate(-1));
  nextBtn.addEventListener('click', () => navigate(1));

  document.addEventListener('keydown', e => {
    if (modalEl.hidden) return;
    if (e.key === 'Escape')      close();
    if (e.key === 'ArrowLeft')   navigate(-1);
    if (e.key === 'ArrowRight')  navigate(1);
  });
});
