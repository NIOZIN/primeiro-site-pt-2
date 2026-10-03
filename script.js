const header = document.querySelector('.site-header');
const nav = document.querySelector('.site-nav');
const menuButton = document.querySelector('.mobile-menu-toggle');
const modal = document.querySelector('#briefing-modal');
const modalClose = document.querySelector('.modal-close');
const toast = document.querySelector('.toast-notice');
const cursorGlow = document.querySelector('.cursor-glow');
const whatsappNumber = '5532998474673';

function whatsappUrl(message) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 24);
});

menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('is-mobile-open');
  menuButton.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.site-nav a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.site-nav a').forEach(item => item.classList.remove('is-active'));
    link.classList.add('is-active');
    nav.classList.remove('is-mobile-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

function openModal() {
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('.js-open-briefing').forEach(button => {
  button.addEventListener('click', openModal);
});
modalClose?.addEventListener('click', closeModal);
modal?.addEventListener('click', event => {
  if (event.target === modal) closeModal();
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
});

document.querySelectorAll('.filter-btn').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(item => item.classList.remove('is-active'));
    button.classList.add('is-active');
    const filter = button.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card => {
      card.style.display = filter === 'all' || card.dataset.category === filter ? '' : 'none';
    });
  });
});

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', event => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`);
  });
});

document.querySelector('#briefing-form')?.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const message = [
    'Olá! Gostaria de enviar um briefing para a FRΛZE.',
    '',
    `Nome: ${data.get('name') || 'Não informado'}`,
    `E-mail: ${data.get('email') || 'Não informado'}`,
    `Sobre o pedido: ${data.get('message') || 'Não informado'}`,
  ].join('\n');
  window.location.href = whatsappUrl(message);
});

if (cursorGlow && matchMedia('(pointer:fine)').matches) {
  document.addEventListener('mousemove', event => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  });
  document.querySelectorAll('a, button, input, textarea, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursorGlow.classList.add('is-active'));
    el.addEventListener('mouseleave', () => cursorGlow.classList.remove('is-active'));
  });
}

/**
 * ScrollBuildShowcase
 * Reusable scroll-driven portfolio build sequence.
 * Customize colors through --build-purple/--build-black/--build-white on the section.
 */
class ScrollBuildShowcase {
  constructor(root) {
    this.root = root;
    this.tabs = [...root.querySelectorAll('[data-build-step]')];
    this.tilt = root.querySelector('[data-build-tilt]');
    this.reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    this.pointerFine = matchMedia('(pointer: fine)');
    this.frame = null;
    this.activeStep = -1;

    this.update = this.update.bind(this);
    this.requestUpdate = this.requestUpdate.bind(this);
    this.bindEvents();
    this.update();
  }

  bindEvents() {
    addEventListener('scroll', this.requestUpdate, { passive: true });
    addEventListener('resize', this.requestUpdate, { passive: true });

    this.tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => this.goToStep(index));
      tab.addEventListener('keydown', event => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? 2 :
          (index + (event.key === 'ArrowRight' ? 1 : -1) + this.tabs.length) % this.tabs.length;
        this.tabs[next].focus();
        this.goToStep(next);
      });
    });

    if (this.tilt && this.pointerFine.matches && !this.reducedMotion.matches) {
      this.tilt.addEventListener('pointermove', event => {
        const rect = this.tilt.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;
        this.tilt.style.transform = `rotateX(${-y * 2.5}deg) rotateY(${x * 3.5}deg)`;
      });
      this.tilt.addEventListener('pointerleave', () => { this.tilt.style.transform = ''; });
    }
  }

  requestUpdate() {
    if (this.frame) return;
    this.frame = requestAnimationFrame(() => {
      this.frame = null;
      this.update();
    });
  }

  update() {
    if (this.reducedMotion.matches) return this.setStep(2);
    const rect = this.root.getBoundingClientRect();
    const scrollable = Math.max(1, rect.height - innerHeight);
    const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
    const range = (start, end) => Math.min(1, Math.max(0, (progress - start) / (end - start)));

    const structure = range(0, .27);
    const design = range(.28, .62);
    const responsive = range(.64, .94);

    this.root.style.setProperty('--structure', structure.toFixed(3));
    this.root.style.setProperty('--design', design.toFixed(3));
    this.root.style.setProperty('--responsive', responsive.toFixed(3));
    this.root.style.setProperty('--browser-opacity', (.12 + structure * .88).toFixed(3));
    this.root.style.setProperty('--browser-y', `${((1 - structure) * 42).toFixed(2)}px`);
    this.root.style.setProperty('--browser-scale', (.94 + structure * .06).toFixed(4));
    this.root.style.setProperty('--wire-opacity', (1 - design).toFixed(3));
    this.root.style.setProperty('--wire-right', `${((1 - structure) * 100).toFixed(2)}%`);
    this.root.style.setProperty('--design-scale', (.985 + design * .015).toFixed(4));
    this.root.style.setProperty('--phone-opacity', responsive.toFixed(3));
    this.root.style.setProperty('--phone-x', `${((1 - responsive) * 130).toFixed(2)}%`);
    this.root.style.setProperty('--phone-rotate', `${((1 - responsive) * 5).toFixed(2)}deg`);
    this.root.style.setProperty('--mobile-browser-x', `${(-responsive * 12).toFixed(2)}%`);
    this.root.style.setProperty('--mobile-browser-y', `${((1 - structure) * 28).toFixed(2)}px`);
    this.root.style.setProperty('--mobile-browser-scale', (.94 + structure * .06 - responsive * .12).toFixed(4));
    this.setStep(progress < .32 ? 0 : progress < .66 ? 1 : 2);
  }

  setStep(step) {
    if (step === this.activeStep) return;
    this.activeStep = step;
    this.tabs.forEach((tab, index) => {
      tab.setAttribute('aria-selected', String(index === step));
      tab.tabIndex = index === step ? 0 : -1;
    });
  }

  goToStep(step) {
    const targets = [.12, .47, .82];
    const top = scrollY + this.root.getBoundingClientRect().top;
    const scrollable = Math.max(0, this.root.offsetHeight - innerHeight);
    scrollTo({ top: top + scrollable * targets[step], behavior: this.reducedMotion.matches ? 'auto' : 'smooth' });
  }
}

document.querySelectorAll('[data-build-showcase]').forEach(section => new ScrollBuildShowcase(section));

// Lightweight motion system inspired by the selected Não Codei CSS patterns.
// It keeps the page feeling continuous without adding an animation dependency.
class PageMotion {
  constructor() {
    this.reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.progress = document.createElement('div');
    this.progress.className = 'page-progress';
    this.progress.setAttribute('aria-hidden', 'true');
    document.body.appendChild(this.progress);

    this.prepareReveals();
    this.updateProgress = this.updateProgress.bind(this);
    addEventListener('scroll', this.updateProgress, { passive: true });
    addEventListener('resize', this.updateProgress, { passive: true });
    this.updateProgress();
  }

  prepareReveals() {
    const revealSelectors = [
      '.manifesto-lead', '.manifesto-body', '.manifesto-media', '.pillar-card',
      '.animated-web-copy > p', '.animated-web-features', '.animated-site-visual',
      '.service-card', '.cta-description', '.cta-actions',
      '.footer-brand-block', '.footer-col'
    ];
    const curtainSelectors = [
      '.manifesto-heading', '.portfolio-title', '.services-title', '.cta-title'
    ];

    document.querySelectorAll(revealSelectors.join(',')).forEach((element, index) => {
      element.classList.add('motion-reveal');
      element.style.setProperty('--motion-delay', `${(index % 4) * 75}ms`);
    });
    document.querySelectorAll(curtainSelectors.join(',')).forEach(element => {
      element.classList.add('motion-curtain');
    });

    const targets = document.querySelectorAll('.motion-reveal, .motion-curtain');
    if (this.reducedMotion || !('IntersectionObserver' in window)) {
      targets.forEach(element => element.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: .12, rootMargin: '0px 0px -7% 0px' });

    targets.forEach(element => observer.observe(element));
  }

  updateProgress() {
    const maximum = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    document.documentElement.style.setProperty('--page-progress', Math.min(1, scrollY / maximum).toFixed(4));
  }
}

new PageMotion();
