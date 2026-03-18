/**
 * Work page — chip filter
 * Filters .work-card elements by data-category.
 * Hides empty .work-row and .work-section containers.
 */
document.addEventListener('DOMContentLoaded', () => {
  const chips    = document.querySelectorAll('.chip[data-filter]');
  const cards    = document.querySelectorAll('.work-card[data-category]');
  const rows     = document.querySelectorAll('.work-row');
  const sections = document.querySelectorAll('.work-section');

  function applyFilter(filter) {
    const toAnimate = [];

    // 1. Show / hide cards — support space-separated multi-category values
    cards.forEach(card => {
      const categories = (card.dataset.category || '').split(' ');
      const shouldShow = filter === 'all' || categories.includes(filter);

      if (!shouldShow) {
        card.hidden = true;
        card.classList.remove('is-visible');
      } else {
        card.hidden = false;
        card.classList.remove('is-visible');
        toAnimate.push(card);
      }
    });

    // 2. Hide rows that have no visible cards
    rows.forEach(row => {
      const hasVisible = [...row.querySelectorAll('.work-card')].some(c => !c.hidden);
      row.hidden = !hasVisible;
    });

    // 3. Hide sections that have no visible cards
    sections.forEach(section => {
      const hasVisible = [...section.querySelectorAll('.work-card')].some(c => !c.hidden);
      section.hidden = !hasVisible;
    });

    // 4. Flush layout so the browser registers the reset state, then stagger cards in
    void document.body.offsetHeight;
    toAnimate.forEach((card, i) => {
      setTimeout(() => card.classList.add('is-visible'), i * 70);
    });
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const filter = chip.dataset.filter;

      // Update chip active state + aria
      chips.forEach(c => {
        c.classList.remove('chip--active');
        c.setAttribute('aria-pressed', 'false');
      });
      // Force animation replay even if this chip was already active
      chip.classList.remove('chip--active');
      void chip.offsetWidth; // reflow
      chip.classList.add('chip--active');
      chip.setAttribute('aria-pressed', 'true');

      applyFilter(filter);
    });
  });
});
