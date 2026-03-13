/* ============================================
   SLC LOCATION â€” JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // Active les animations uniquement si JS tourne (Ã©vite le contenu invisible en local)
  document.body.classList.add('js-ready');

  /* ---- NAVBAR: scroll effect ---- */
  const navbar = document.querySelector('.navbar');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });

  /* ---- NAVBAR: hero bg parallax ---- */
  const heroBg = document.querySelector('.hero__bg');
  const handleParallax = () => {
    if (!heroBg) return;
    const scrollY = window.scrollY;
    heroBg.style.transform = `scale(1) translateY(${scrollY * 0.3}px)`;
  };
  window.addEventListener('scroll', handleParallax, { passive: true });

  /* ---- HERO: loaded state for bg animation ---- */
  const hero = document.querySelector('.hero');
  if (hero) {
    setTimeout(() => hero.classList.add('loaded'), 100);
  }

  /* ---- HAMBURGER MENU ---- */
  const hamburger = document.querySelector('.navbar__hamburger');
  const mobileMenu = document.querySelector('.navbar__mobile');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- SCROLL REVEAL ---- */
  const allRevealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  // Add stagger to grid children
  const staggerParents = document.querySelectorAll('.equipment__grid, .steps__grid, .reviews__grid, .about__features');
  staggerParents.forEach(parent => {
    Array.from(parent.children).forEach((child, i) => {
      child.dataset.delay = i * 100;
    });
  });

  const showElement = (el) => {
    const delay = el.dataset.delay || 0;
    setTimeout(() => el.classList.add('visible'), parseInt(delay));
  };

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          showElement(entry.target);
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -30px 0px'
    });

    allRevealEls.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback : pas d'IntersectionObserver â†’ tout afficher
    allRevealEls.forEach(el => el.classList.add('visible'));
  }

  // Failsafe : aprÃ¨s 800ms, tout ce qui n'est pas encore visible devient visible
  setTimeout(() => {
    allRevealEls.forEach(el => {
      if (!el.classList.contains('visible')) {
        el.classList.add('visible');
      }
    });
  }, 800);

  /* ---- MODALS (EQUIPMENT) ---- */
  const modalOverlay = document.getElementById('modal-overlay');
  const modalClose = document.querySelector('.modal__close');

  const products = {
    'mini-pelle': {
      title: 'Mini-Pelle',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      description: 'La mini-pelle idÃ©ale pour tous vos travaux de terrassement, mÃªme dans les espaces les plus restreints. Compacte et maniable, elle s'adapte Ã  une grande variÃ©tÃ© de chantiers : jardins, tranchÃ©es, fondations, dÃ©molition lÃ©gÃ¨re, etc.',
      specs: ['Godet de creusage 20cm', 'Godet de creusage 40cm', 'Godet de curage 100cm', 'Faible encombrement', 'IdÃ©ale espaces restreints'],
      placeholder: 'ðŸ“‹ Informations techniques complÃ©mentaires Ã  venir (poids, portÃ©e, etc.)'
    },
    'nacelle-stabilisateur': {
      title: 'Nacelle avec Stabilisateur',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
      description: 'La nacelle avec stabilisateur garantit une stabilitÃ© maximale et une sÃ©curitÃ© optimale pour tous vos travaux en hauteur. Parfaitement adaptÃ©e aux chantiers exigeant prÃ©cision et sÃ©curitÃ©.',
      specs: ['Stabilisateurs dÃ©ployables', 'SÃ©curitÃ© maximale', 'Travaux en hauteur', 'Plateforme stable'],
      placeholder: 'ðŸ“‹ Informations techniques complÃ©mentaires Ã  venir (hauteur max, charge utile, etc.)'
    },
    'citroen-jumpy': {
      title: 'CitroÃ«n Jumpy 9 Places',
      image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80',
      description: 'Parfait pour vos dÃ©placements professionnels ou voyages en groupe, le Jumpy 9 places allie confort et praticitÃ©. IdÃ©al pour transporter votre Ã©quipe sur les chantiers avec facilitÃ©.',
      specs: ['9 places assises', 'Forfait 500 km inclus', 'Km supplÃ©mentaires possibles', 'Climatisation', 'Confort voyage'],
      placeholder: 'ðŸ“‹ Informations complÃ©mentaires Ã  venir (options, caution, conditions, etc.)'
    },
    'nacelle': {
      title: 'Nacelle',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
      description: 'AccÃ©dez facilement Ã  vos zones de travail Ã©levÃ©es grÃ¢ce Ã  notre nacelle performante. Polyvalente et puissante, elle convient Ã  de nombreux types d'interventions en hauteur.',
      specs: ['Haute performance', 'Polyvalente', 'Forfait 500 km inclus', 'Km supplÃ©mentaires possibles'],
      placeholder: 'ðŸ“‹ Informations techniques complÃ©mentaires Ã  venir (hauteur, capacitÃ©, etc.)'
    }
  };

  // Open modal
  document.querySelectorAll('[data-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const key = btn.dataset.modal;
      const product = products[key];
      if (!product || !modalOverlay) return;

      // Populate modal
      document.getElementById('modal-title').textContent = product.title;
      document.getElementById('modal-img').src = product.image;
      document.getElementById('modal-img').alt = product.title;
      document.getElementById('modal-desc').textContent = product.description;
      document.getElementById('modal-placeholder').textContent = product.placeholder;

      const specsContainer = document.getElementById('modal-specs');
      specsContainer.innerHTML = product.specs.map(s => `<span class="modal__spec">${s}</span>`).join('');

      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close modal
  const closeModal = () => {
    modalOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  };

  modalClose?.addEventListener('click', closeModal);
  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  /* ---- SMOOTH SCROLL for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---- ACTIVE NAV LINK on scroll ---- */
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('.navbar__menu a');

  const activateNavLink = () => {
    let currentSection = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 100;
      if (window.scrollY >= top) {
        currentSection = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.style.color = '';
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.style.color = 'var(--yellow)';
      }
    });
  };

  window.addEventListener('scroll', activateNavLink, { passive: true });

  /* ---- CONTACT FORM (contact.html) ---- */
  const contactForm = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('.btn-submit');
      const originalHTML = submitBtn.innerHTML;

      // Loading state
      submitBtn.innerHTML = '<span>â³</span> Envoi en cours...';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';

      try {
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          // Success
          contactForm.reset();
          submitBtn.innerHTML = '<span>âœ“</span> EnvoyÃ© !';
          submitBtn.style.background = '#2d6a2d';
          submitBtn.style.borderColor = '#2d6a2d';
          submitBtn.style.color = 'white';

          if (successMsg) {
            successMsg.classList.add('show');
            successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        } else {
          throw new Error('Erreur rÃ©seau');
        }
      } catch (err) {
        // Error state
        submitBtn.innerHTML = 'âš ï¸ Erreur. RÃ©essayez.';
        submitBtn.style.background = '#6a1a1a';
        submitBtn.style.borderColor = '#6a1a1a';
        submitBtn.style.color = 'white';
        setTimeout(() => {
          submitBtn.innerHTML = originalHTML;
          submitBtn.style.background = '';
          submitBtn.style.borderColor = '';
          submitBtn.style.color = '';
          submitBtn.disabled = false;
          submitBtn.style.opacity = '';
        }, 3000);
      }
    });
  }

  /* ---- COUNTER ANIMATION ---- */
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.count);
        const duration = 1500;
        const start = performance.now();
        const update = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          entry.target.textContent = Math.floor(eased * target);
          if (progress < 1) requestAnimationFrame(update);
          else entry.target.textContent = target;
        };
        requestAnimationFrame(update);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  /* ---- YEAR in footer ---- */
  const yearEl = document.querySelector('.footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
