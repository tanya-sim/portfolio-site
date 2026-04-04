/**
 * Full-screen modal — reusable for images and videos.
 *
 * Usage: add class="lightbox-trigger" and data attributes to any element:
 *   data-lightbox-src   — media source URL
 *   data-lightbox-type  — "image" or "video"
 *   data-lightbox-group — group name for prev/next navigation
 *   data-lightbox-title — modal title text
 *   data-lightbox-desc  — modal description text
 */
document.addEventListener('DOMContentLoaded', () => {
  const lightbox  = document.getElementById('lightbox');
  if (!lightbox) return;

  const closeBtn  = document.getElementById('lightboxClose');
  const prevBtn   = document.getElementById('lightboxPrev');
  const nextBtn   = document.getElementById('lightboxNext');
  const body      = document.getElementById('lightboxBody');
  const titleEl   = document.getElementById('lightboxTitle');
  const descEl    = document.getElementById('lightboxDesc');

  let triggers = [];
  let currentIndex = 0;

  function open(trigger) {
    const group = trigger.dataset.lightboxGroup;
    triggers = group
      ? Array.from(document.querySelectorAll(`.lightbox-trigger[data-lightbox-group="${group}"]`))
      : [trigger];
    currentIndex = triggers.indexOf(trigger);

    showCurrent();
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function showCurrent() {
    const t    = triggers[currentIndex];
    const src  = t.dataset.lightboxSrc;
    const type = t.dataset.lightboxType;

    // Title & description
    titleEl.textContent = t.dataset.lightboxTitle || '';
    descEl.textContent  = t.dataset.lightboxDesc  || '';

    // Stop any playing video
    const oldVideo = body.querySelector('video');
    if (oldVideo) { oldVideo.pause(); oldVideo.src = ''; }

    body.innerHTML = '';

    const w = t.dataset.lightboxWidth;

    if (type === 'video') {
      const video = document.createElement('video');
      video.src = src;
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      if (w) video.style.width = w + 'px';
      body.appendChild(video);
    } else {
      const img = document.createElement('img');
      img.src = src;
      img.alt = t.querySelector('img')?.alt || '';
      if (w) img.style.width = w + 'px';
      body.appendChild(img);
    }

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === triggers.length - 1;
  }

  function close() {
    const video = body.querySelector('video');
    if (video) { video.pause(); video.src = ''; }
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function navigate(dir) {
    const next = currentIndex + dir;
    if (next < 0 || next >= triggers.length) return;
    currentIndex = next;
    showCurrent();
  }

  // Click triggers
  document.querySelectorAll('.lightbox-trigger').forEach(el => {
    el.addEventListener('click', (e) => {
      open(el);
    });
  });

  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', () => navigate(-1));
  nextBtn.addEventListener('click', () => navigate(1));

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape')     close();
    if (e.key === 'ArrowLeft')  navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });
});
