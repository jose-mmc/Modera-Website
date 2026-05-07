// ─── NAV ──────────────────────────────────────────────
const nav = document.getElementById('nav');
const launchBanner = document.getElementById('launchBanner');

function updateBanner() {
  launchBanner.style.top = nav.offsetHeight + 'px';
}
updateBanner();

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
  updateBanner();
}, { passive: true });

// ─── HAMBURGER MENU ───────────────────────────────────
const hamburger = document.getElementById('navHamburger');
const navMenu   = document.getElementById('navMenu');
const navOverlay = document.getElementById('navOverlay');
const menuClose  = document.getElementById('menuClose');

function openMenu() {
  hamburger.classList.add('active');
  navMenu.classList.add('open');
  navOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  hamburger.classList.remove('active');
  navMenu.classList.remove('open');
  navOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', openMenu);
menuClose.addEventListener('click', closeMenu);
navOverlay.addEventListener('click', closeMenu);
document.querySelectorAll('.menu-link').forEach(l => l.addEventListener('click', closeMenu));

// ─── SCROLL REVEAL ────────────────────────────────────
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

// ─── NOTIFY FORM ──────────────────────────────────────
async function handleNotify(e) {
  e.preventDefault();
  if (document.querySelector('input[name="_trap"]').value) return;
  const email = document.getElementById('notifyEmail').value;
  const btn = document.querySelector('.notify-btn');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  try {
    const res = await fetch('https://a.klaviyo.com/client/subscriptions/?company_id=WpzcDK', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'revision': '2024-02-15'
      },
      body: JSON.stringify({
        data: {
          type: 'subscription',
          attributes: {
            profile: {
              data: {
                type: 'profile',
                attributes: { email }
              }
            }
          },
          relationships: {
            list: {
              data: {
                type: 'list',
                id: 'QS73uf'
              }
            }
          }
        }
      })
    });

    if (res.status === 202 || res.status === 200) {
      document.getElementById('notifyForm').style.display = 'none';
      document.getElementById('notifySuccess').style.display = 'block';
    } else {
      const body = await res.text();
      console.error('Klaviyo error:', res.status, body);
      btn.textContent = 'Try Again';
      btn.disabled = false;
    }
  } catch (err) {
    console.error('Klaviyo fetch error:', err);
    btn.textContent = 'Try Again';
    btn.disabled = false;
  }
}

window.handleNotify = handleNotify;

// ─── HERO PARALLAX ────────────────────────────────────
const heroBg = document.querySelector('.hero-bg-word');
window.addEventListener('scroll', () => {
  if (heroBg && window.scrollY < window.innerHeight) {
    heroBg.style.transform = `translate(-50%, calc(-50% + ${window.scrollY * 0.22}px))`;
  }
}, { passive: true });
