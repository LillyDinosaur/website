(function () {
  const page = document.body.dataset.page;

  const navLinks = document.querySelectorAll('.site-nav a');
  const currentPath = location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach((link) => {
    const target = link.getAttribute('href');
    if (target === currentPath || (!currentPath && target === 'index.html')) {
      link.setAttribute('aria-current', 'page');
    }
  });

  const revealItems = document.querySelectorAll('.reveal');
  if (revealItems.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealItems.forEach((item) => observer.observe(item));
  }

  if (page === 'home') {
    const vibeButton = document.getElementById('vibe-button');
    const vibeLine = document.getElementById('vibe-line');

    if (vibeButton && vibeLine) {
      const vibes = [
        'Currently: beachy, bubbly, and reading something great.',
        'Currently: pink outfit, hockey mindset, and a sweet snack nearby.',
        'Currently: baking something cute while a guilty-pleasure show plays.',
        'Currently: matching the tropics with shells, sunshine, and good vibes.'
      ];

      let index = 0;
      vibeButton.addEventListener('click', () => {
        index = (index + 1) % vibes.length;
        vibeLine.textContent = vibes[index];
      });
    }
  }

  if (page === 'scrapbook') {
    const filterButtons = document.querySelectorAll('.filter-chip');
    const cards = document.querySelectorAll('.scrap-card');

    const applyFilter = (filter) => {
      filterButtons.forEach((button) => {
        button.classList.toggle('active', button.dataset.filter === filter);
      });

      cards.forEach((card) => {
        const tags = (card.dataset.tags || '').split(/\s+/).filter(Boolean);
        const show = filter === 'all' || tags.includes(filter);
        card.classList.toggle('hidden', !show);
      });
    };

    filterButtons.forEach((button) => {
      button.addEventListener('click', () => applyFilter(button.dataset.filter || 'all'));
    });
  }
})();