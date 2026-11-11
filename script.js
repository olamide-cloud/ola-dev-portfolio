
// ==========================================
// MOBILE NAVIGATION
// ==========================================

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ==========================================
// AUTOMATIC FOOTER YEAR
// ==========================================

const year = document.getElementById('year');

if (year) {
  year.textContent = new Date().getFullYear();
}

// ==========================================
// ENABLE ANIMATIONS
// ==========================================

document.documentElement.classList.add('js-enabled');

// ==========================================
// SCROLL PROGRESS BAR
// ==========================================

const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

function updateScrollProgress() {
  const scrollable =
    document.documentElement.scrollHeight - window.innerHeight;

  const progress = scrollable > 0
    ? (window.scrollY / scrollable) * 100
    : 0;

  progressBar.style.width = `${progress}%`;
}

window.addEventListener('scroll', updateScrollProgress, {
  passive: true
});

updateScrollProgress();

// ==========================================
// SCROLL REVEAL ANIMATIONS
// ==========================================

const revealElements = document.querySelectorAll(
  '.section-heading, .about-copy, .facts, .skill-card, ' +
  '.project-card, .service-list > div, .contact > *'
);

revealElements.forEach((element, index) => {
  element.classList.add('reveal');

  if (
    element.classList.contains('skill-card') ||
    element.classList.contains('project-card') ||
    element.classList.contains('service-list-item')
  ) {
    element.style.setProperty(
      '--reveal-delay',
      `${(index % 4) * 100}ms`
    );
  }
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  }
);

revealElements.forEach(element => {
  revealObserver.observe(element);
});

// ==========================================
// HERO ENTRANCE ANIMATION
// ==========================================

const heroElements = document.querySelectorAll(
  '.hero-copy > *, .hero-art'
);

heroElements.forEach((element, index) => {
  element.classList.add('hero-animate');
  element.style.setProperty(
    '--hero-delay',
    `${index * 120}ms`
  );
});

// ==========================================
// ANIMATED CUSTOM CURSOR
// DESKTOP ONLY
// ==========================================

const desktopPointer = window.matchMedia(
  '(pointer: fine) and (prefers-reduced-motion: no-preference)'
);

if (desktopPointer.matches) {
  document.body.classList.add('custom-cursor-enabled');

  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';

  const cursorDot = document.createElement('div');
  cursorDot.className = 'cursor-dot';

  document.body.append(cursor, cursorDot);

  let mouseX = 0;
  let mouseY = 0;

  window.addEventListener('mousemove', event => {
    mouseX = event.clientX;
    mouseY = event.clientY;

    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;

    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  });

  document.querySelectorAll(
    'a, button, .project-card, .skill-card'
  ).forEach(element => {
    element.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor-hover');
    });

    element.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor-hover');
    });
  });

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorDot.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    cursorDot.style.opacity = '1';
  });
}

// ==========================================
// PROJECT CARD POINTER EFFECT
// ==========================================

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', event => {
    if (!desktopPointer.matches) return;

    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});

/* =====================================
   PAGE LOADING ANIMATION
===================================== */

const pageLoader = document.createElement('div');
pageLoader.className = 'page-loader';

pageLoader.innerHTML = `
  <div class="loader-logo">OLA<span>DEV.</span></div>
  <div class="loader-ring"></div>
  <div class="loader-caption">Preparing your experience</div>
`;

document.body.appendChild(pageLoader);

function hidePageLoader() {
  pageLoader.classList.add('loader-hidden');

  setTimeout(() => {
    pageLoader.remove();
  }, 700);
}

if (document.readyState === 'complete') {
  hidePageLoader();
} else {
  window.addEventListener('load', hidePageLoader, {
    once: true
  });
}

/* =====================================
   BACK TO TOP FUNCTIONALITY
===================================== */

const backToTop = document.createElement('button');

backToTop.className = 'back-to-top';
backToTop.innerHTML = '&uarr;';
backToTop.setAttribute('aria-label', 'Back to top');
backToTop.setAttribute('title', 'Back to top');

document.body.appendChild(backToTop);

// Show button after scrolling down

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
}, { passive: true });

// Scroll smoothly to the top

backToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches ? 'instant' : 'smooth'
  });
});
