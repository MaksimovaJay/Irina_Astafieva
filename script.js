/* Куки-плашка */
if (localStorage.getItem('cookie_ok')) {
  const bar = document.getElementById('cookieBar');
  if (bar) bar.style.display = 'none';
}

/* Бургер */
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navMenu.classList.toggle('open');
});
navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navToggle.classList.remove('open');
  navMenu.classList.remove('open');
}));

/* Fade-in при скролле */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* Кнопка наверх */
const btn = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  btn.classList.toggle('visible', window.scrollY > 400);
});
btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* Раскрытие отзывов на мобилке */
document.querySelectorAll('.t-expand-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const wrap = btn.previousElementSibling;
    wrap.classList.add('expanded');
    btn.classList.add('hidden');
  });
});

/* FAQ аккордеон */
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const isOpen = answer.classList.contains('open');
  document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
  document.querySelectorAll('.faq-question').forEach(b => b.classList.remove('open'));
  if (!isOpen) { answer.classList.add('open'); btn.classList.add('open'); }
}


// ─── Галереи мероприятий + лайтбокс ─────────────────
(function () {
  const galleries = document.querySelectorAll('.event-gallery');
  if (!galleries.length) return;

  const THUMBS = 4;
  let current = [], index = 0, alt = '';

  const box = document.createElement('div');
  box.className = 'lightbox';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.innerHTML =
    '<button class="lb-close" aria-label="Закрыть">&times;</button>' +
    '<button class="lb-prev" aria-label="Предыдущее фото">&#8249;</button>' +
    '<img class="lb-img" alt="" />' +
    '<button class="lb-next" aria-label="Следующее фото">&#8250;</button>' +
    '<div class="lb-count"></div>';
  document.body.appendChild(box);
  const img = box.querySelector('.lb-img');
  const count = box.querySelector('.lb-count');

  function show(i) {
    index = (i + current.length) % current.length;
    img.src = current[index];
    img.alt = alt + ' — фото ' + (index + 1);
    count.textContent = (index + 1) + ' / ' + current.length;
  }
  function open(list, i, a) {
    current = list; alt = a; show(i);
    box.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    box.classList.remove('open');
    document.body.style.overflow = '';
  }

  box.querySelector('.lb-close').addEventListener('click', close);
  box.querySelector('.lb-prev').addEventListener('click', () => show(index - 1));
  box.querySelector('.lb-next').addEventListener('click', () => show(index + 1));
  box.addEventListener('click', e => { if (e.target === box) close(); });
  document.addEventListener('keydown', e => {
    if (!box.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });
  let touchX = null;
  box.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
  box.addEventListener('touchend', e => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) show(index + (dx < 0 ? 1 : -1));
    touchX = null;
  });

  galleries.forEach(g => {
    const list = g.dataset.photos.split(',').map(s => s.trim()).filter(Boolean);
    const a = g.dataset.alt || '';

    const cover = document.createElement('button');
    cover.className = 'eg-cover';
    cover.setAttribute('aria-label', 'Открыть фотографии: ' + a);
    cover.innerHTML = '<img src="' + list[0] + '" alt="' + a + '" loading="lazy" />';
    cover.addEventListener('click', () => open(list, 0, a));
    g.appendChild(cover);

    const thumbs = document.createElement('div');
    thumbs.className = 'eg-thumbs';
    list.slice(1, 1 + THUMBS).forEach((src, k) => {
      const b = document.createElement('button');
      b.className = 'eg-thumb';
      b.setAttribute('aria-label', 'Фото ' + (k + 2));
      b.innerHTML = '<img src="' + src + '" alt="" loading="lazy" />';
      const rest = list.length - 1 - THUMBS;
      if (k === THUMBS - 1 && rest > 0) b.innerHTML += '<span class="eg-more">+' + rest + '</span>';
      b.addEventListener('click', () => open(list, k + 1, a));
      thumbs.appendChild(b);
    });
    g.appendChild(thumbs);
  });
})();
