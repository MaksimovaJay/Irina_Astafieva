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

