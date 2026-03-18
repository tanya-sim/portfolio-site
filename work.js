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
    // 1. Show / hide cards — support space-separated multi-category values
    cards.forEach(card => {
      const categories = (card.dataset.category || '').split(' ');
      card.hidden = filter !== 'all' && !categories.includes(filter);
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
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const filter = chip.dataset.filter;

      // Update chip active state + aria
      chips.forEach(c => {
        c.classList.remove('chip--active');
        c.setAttribute('aria-pressed', 'false');
      });
      chip.classList.add('chip--active');
      chip.setAttribute('aria-pressed', 'true');

      applyFilter(filter);
    });
  });
});
