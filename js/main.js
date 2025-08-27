// main.js - interactions: theme toggle, project filter, copy email, animations, footer date
(function(){
  "use strict";

  // Elements
  const themeBtn = document.getElementById('themeToggle');
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const copyEmailCard = document.getElementById('copyEmailCard');
  const toast = document.getElementById('toast');
  const curYear = document.getElementById('curYear');
  const lastUpdated = document.getElementById('lastUpdated');


  // init
  curYear.textContent = new Date().getFullYear();
  lastUpdated.textContent = (new Date()).toLocaleDateString();

  // Theme toggle with localStorage
  const userPrefTheme = localStorage.getItem('philo-theme');
  if(userPrefTheme === 'dark') document.body.classList.add('dark');

  themeBtn.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');
    localStorage.setItem('philo-theme', isDark ? 'dark' : 'light');
    themeBtn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    themeBtn.textContent = isDark ? '☀️' : '🌙';
  });

  // Copy email helper
  function showToast(msg){
    toast.hidden = false;
    toast.textContent = msg;
    setTimeout(()=> toast.hidden = true, 2000);
  }

  function copyEmail(email){
    navigator.clipboard?.writeText(email).then(()=> {
      showToast('Email copied to clipboard');
    }).catch(()=> {
      showToast('Copy failed — open mail client');
    });
  }

  copyEmailBtn?.addEventListener('click', (e) => {
    const email = e.currentTarget.dataset.email;
    copyEmail(email);
  });

  copyEmailCard?.addEventListener('click', (e) => {
    const email = e.currentTarget.dataset.email;
    copyEmail(email);
  });

  // Project filter
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.remove('active'); b.setAttribute('aria-selected','false');
      });
      btn.classList.add('active'); btn.setAttribute('aria-selected','true');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.project-card').forEach(card => {
        const cat = card.dataset.category || 'all';
        if(filter === 'all' || cat === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Simple scroll reveal (respect prefers-reduced-motion)
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!prefersReduced) {
    const animEls = document.querySelectorAll('[data-anim]');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if(en.isIntersecting) {
          en.target.style.opacity = 1;
          en.target.style.transform = 'translateY(0)';
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    animEls.forEach(el => {
      el.style.opacity = 0;
      el.style.transform = 'translateY(8px)';
      el.style.transition = 'opacity 220ms ease, transform 220ms ease';
      io.observe(el);
    });
  }

  // Smooth scroll for internal links (respect motion)
  if(!prefersReduced) {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', function(e){
        const target = document.querySelector(this.getAttribute('href'));
        if(target) {
          e.preventDefault();
          target.scrollIntoView({behavior:'smooth', block:'start'});
        }
      });
    });
  }

})();
