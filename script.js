
// ==========================================
// MOBILE NAVIGATION
// ==========================================

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (toggle && nav) {
  function closeMenu() {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation menu');
  }

  function openMenu() {
    nav.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close navigation menu');
  }

  toggle.addEventListener('click', () => {
    nav.classList.contains('open') ? closeMenu() : openMenu();
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('open')) {
      closeMenu();
      toggle.focus();
    }
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
// PAGE LOADING ANIMATION
// ==========================================

const pageLoader = document.querySelector('.page-loader');

function hidePageLoader() {
  if (!pageLoader) return;

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


// ==========================================
// SCROLL PROGRESS BAR
// ==========================================

const progressBar = document.querySelector('.scroll-progress');

function updateScrollProgress() {
  if (!progressBar) return;

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

window.addEventListener('resize', updateScrollProgress);

updateScrollProgress();


// ==========================================
// SCROLL REVEAL ANIMATIONS
// ==========================================

// IMPORTANT:
// Include existing .reveal sections so they
// don't remain invisible permanently.

const revealElements = document.querySelectorAll(
  '.reveal, .section-heading, .about-copy, .facts, ' +
  '.skill-card, .project-card, .service-list > div, ' +
  '.contact > *'
);

// Prepare reveal elements
revealElements.forEach((element, index) => {
  element.classList.add('reveal');

  if (
    element.classList.contains('skill-card') ||
    element.classList.contains('project-card') ||
    element.classList.contains('process-card') ||
    element.classList.contains('service-list-item')
  ) {
    element.style.setProperty(
      '--reveal-delay',
      `${(index % 4) * 100}ms`
    );
  }
});

// Reveal observer
if ('IntersectionObserver' in window) {

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
      threshold: 0.08,
      rootMargin: '0px 0px -30px 0px'
    }
  );

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

} else {
  revealElements.forEach(element => {
    element.classList.add('visible');
  });
}


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

  window.addEventListener('mousemove', event => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

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


// ==========================================
// BACK TO TOP FUNCTIONALITY
// ==========================================

const backToTop = document.querySelector('.back-to-top');

if (backToTop) {

  function updateBackToTop() {
    if (window.scrollY > 400) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  }

  window.addEventListener('scroll', updateBackToTop, {
    passive: true
  });

  updateBackToTop();

  backToTop.addEventListener('click', () => {

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? 'instant' : 'smooth'
    });

  });

}


// ==========================================
// ACTIVE NAVIGATION LINK ON SCROLL
// ==========================================

const pageSections = document.querySelectorAll('section[id]');
const navigationLinks = document.querySelectorAll('.nav a');

if ('IntersectionObserver' in window) {

  const sectionObserver = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          navigationLinks.forEach(link => {

            link.classList.remove('active');

            if (
              link.getAttribute('href') ===
              `#${entry.target.id}`
            ) {
              link.classList.add('active');
            }

          });

        }

      });

    },
    {
      threshold: 0.3
    }
  );

  pageSections.forEach(section => {
    sectionObserver.observe(section);
  });

}


// ==========================================
// COPY EMAIL ADDRESS
// ==========================================

const copyEmailBtn = document.getElementById('copyEmailBtn');

if (copyEmailBtn) {

  copyEmailBtn.addEventListener('click', async () => {

    const email = copyEmailBtn.dataset.email;

    try {

      await navigator.clipboard.writeText(email);

      copyEmailBtn.textContent = 'Email Copied ✓';

      setTimeout(() => {
        copyEmailBtn.textContent = 'Copy Email';
      }, 2000);

    } catch (error) {

      copyEmailBtn.textContent = 'Unable to Copy';

    }

  });

}


// ==========================================
// HERO TYPING TEXT
// ==========================================

const roleText = document.getElementById('roleText');

if (roleText) {

  const roles = [
    'Frontend Web Developer',
    'Creative Problem Solver',
    'Aspiring UI/UX Designer',
    'Lifelong Learner'
  ];

  let roleIndex = 0;
  let characterIndex = roles[0].length;
  let deleting = true;

  const typeEffect = () => {

    const currentRole = roles[roleIndex];

    if (deleting) {
      characterIndex--;
    } else {
      characterIndex++;
    }

    roleText.textContent = currentRole.substring(
      0,
      characterIndex
    );

    let delay = deleting ? 45 : 85;

    if (deleting && characterIndex === 0) {

      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 400;

    } else if (
      !deleting &&
      characterIndex === roles[roleIndex].length
    ) {

      deleting = true;
      delay = 1800;

    }

    setTimeout(typeEffect, delay);
  };

  if (
    !window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
  ) {
    setTimeout(typeEffect, 1800);
  }

}
