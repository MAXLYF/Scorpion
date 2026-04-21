/* ═══════════════════════════════════════════════
   SCORPION ROLE PLAY — script.js
   ═══════════════════════════════════════════════ */

/* ─── COPY SERVER IP ─── */
function copyIP() {
  const ip = document.getElementById('ip-text').textContent;
  navigator.clipboard.writeText(ip).catch(() => {});
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2200);
}

/* ─── SCROLL REVEAL ─── */
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => revealObserver.observe(el));

/* ─── ANIMATED COUNTERS ─── */
function animateCounter(el, target, suffix = '') {
  let current = 0;
  const increment = target / 80;
  const timer = setInterval(() => {
    current = Math.min(current + increment, target);
    el.textContent = Math.floor(current).toLocaleString() + suffix;
    if (current >= target) clearInterval(timer);
  }, 18);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('[data-target]');
      nums.forEach(num => {
        const target = parseInt(num.getAttribute('data-target'));
        const suffix = target === 24 ? '/7' : '+';
        animateCounter(num, target, suffix);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsBar = document.querySelector('.stats-bar');
if (statsBar) statsObserver.observe(statsBar);

/* ─── NAVBAR SCROLL EFFECT ─── */
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (!nav) return;
  if (window.scrollY > 80) {
    nav.style.borderBottomColor = 'rgba(255, 46, 166, 0.4)';
    nav.style.background = 'rgba(10, 10, 15, 0.98)';
  } else {
    nav.style.borderBottomColor = 'rgba(255, 46, 166, 0.2)';
    nav.style.background = 'linear-gradient(180deg, rgba(10,10,15,0.98) 0%, rgba(10,10,15,0.85) 100%)';
  }
});

/* ─── SMOOTH SCROLL FOR NAV LINKS ─── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
/* ─── 3D TILT EFFECT ─── */
const cards = document.querySelectorAll('.join-card');
cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) translateY(-10px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = `perspective(1000px) translateY(0) scale(1) rotateX(0) rotateY(0)`;
  });
});
