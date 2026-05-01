// Copied script from index.html - nav scroll, reveal observers, notify form, hero parallax
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

// Reveal observer
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach((el) => revealObs.observe(el));

// Stagger cards
const staggerObs = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.reveal').forEach((child, i) => {
        setTimeout(() => child.classList.add('visible'), i * 140);
      });
      staggerObs.unobserve(e.target);
    }
  });
}, { threshold: 0.06 });

document.querySelectorAll('.p-grid, .gallery-grid, .collection-rules').forEach((el) => {
  staggerObs.observe(el);
});

// Notify form
function handleNotify(e) {
  e.preventDefault();
  const form = document.getElementById('notifyForm');
  const success = document.getElementById('notifySuccess');
  if (form) form.style.display = 'none';
  if (success) success.style.display = 'block';
}

window.handleNotify = handleNotify;

// Hero parallax
const heroBg = document.querySelector('.hero-bg-word');
window.addEventListener('scroll', () => {
  if (heroBg && window.scrollY < window.innerHeight) {
    heroBg.style.transform = `translate(-50%, calc(-50% + ${window.scrollY * 0.22}px))`;
  }
}, { passive: true });