/*
 * Animazioni del sito: GSAP (+ ScrollTrigger, SplitText) e scorrimento fluido con Lenis.
 * Effetti ispirati ai componenti React Bits, riscritti senza React:
 *   - SplitText / BlurText  → titolo dell'hero che compare parola per parola
 *   - Magnet                → pulsanti principali attratti dal puntatore
 *   - SpotlightCard         → luce che segue il mouse sulle card
 * Chi ha attivato "riduci movimento" nel sistema non vede animazioni né scorrimento fluido.
 */
(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const { gsap, ScrollTrigger, SplitText, Lenis } = window;

  /* SpotlightCard: solo CSS + posizione del mouse, funziona anche senza GSAP */
  function spotlight() {
    if (!finePointer) return;
    document.addEventListener('pointermove', (e) => {
      const card = e.target.closest?.('.spotlight');
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    }, { passive: true });
  }

  function init() {
    document.querySelectorAll('.service-card, .info-card, .card-form').forEach((el) => el.classList.add('spotlight'));
    spotlight();
    if (reduce || !gsap) return;

    gsap.registerPlugin(ScrollTrigger, SplitText);
    document.documentElement.classList.add('motion');

    /* ---------- Lenis: scorrimento fluido ---------- */
    let lenis = null;
    if (Lenis) {
      lenis = new Lenis({
        duration: 1.1,
        smoothWheel: true,
        prevent: (node) => !!node.closest?.('#detail, .site-nav.open')
      });
      window.lenis = lenis;
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);

      /* Link interni (#sezione) con scorrimento fluido */
      document.addEventListener('click', (e) => {
        const a = e.target.closest('a[href^="#"]');
        if (!a || e.defaultPrevented) return;
        const id = a.getAttribute('href');
        const target = id.length > 1 && document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target, { offset: -20, duration: 1.2 });
        history.replaceState(null, '', id);
      });

      /* Scheda dettaglio aperta: lo sfondo non scorre */
      const detail = document.getElementById('detail');
      if (detail) {
        new MutationObserver(() => {
          detail.classList.contains('hidden') ? lenis.start() : lenis.stop();
        }).observe(detail, { attributes: true, attributeFilter: ['class'] });
      }
    }

    /* ---------- Hero: SplitText / BlurText ---------- */
    const h1 = document.querySelector('.hero h1');
    let split = null;
    const unsplit = () => {
      if (!split) return;
      split.revert();
      split = null;
      window.I18N?.rescan(h1);
    };
    if (h1 && SplitText) {
      split = new SplitText(h1, { type: 'words', wordsClass: 'split-word' });
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.site-header', { y: -30, opacity: 0, duration: 0.8 })
        .from('.hero-kicker', { y: 16, opacity: 0, duration: 0.6 }, '-=0.4')
        .from(split.words, {
          y: 40, opacity: 0, filter: 'blur(10px)', duration: 0.9, stagger: 0.07, onComplete: unsplit
        }, '-=0.3')
        .from('.hero-text', { y: 20, opacity: 0, duration: 0.7 }, '-=0.5')
        .from('.hero-cta', { y: 20, opacity: 0, duration: 0.6 }, '-=0.45')
        .from('.finder', { y: 50, opacity: 0, duration: 0.9 }, '-=0.4');
      document.addEventListener('langchange', unsplit);
    }

    document.documentElement.classList.remove('motion-pending');

    /* Foto dell'hero: zoom iniziale + parallasse allo scorrimento */
    gsap.fromTo('.hero-media', { scale: 1.08 }, { scale: 1, duration: 2.4, ease: 'power2.out' });
    gsap.to('.hero-media', {
      yPercent: 18, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    });

    /* ---------- Sezioni allo scorrimento ---------- */
    const reveal = (targets, vars, trigger) => {
      gsap.utils.toArray(targets).forEach((el) => {
        gsap.from(el, {
          y: 40, opacity: 0, duration: 0.9, ease: 'power3.out', ...vars,
          scrollTrigger: { trigger: trigger || el, start: 'top 85%', once: true }
        });
      });
    };

    /* Titoli di sezione stile BlurText */
    reveal('.section-head h2, .method-copy h2, .valuation-copy h2, .searched h2', { filter: 'blur(8px)' });
    reveal('.section-head p, .method-copy > p, .valuation-copy > p');

    /* Annunci: entrano a cascata */
    ScrollTrigger.batch('.listing-card', {
      start: 'top 90%',
      once: true,
      onEnter: (cards) => gsap.from(cards, { y: 60, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' })
    });

    /* Sezione Vendi: foto che si scopre + passi a cascata */
    gsap.from('.method-photo', {
      clipPath: 'inset(12% 12% 12% 12% round 30px)', scale: 1.08, duration: 1.3, ease: 'power3.out',
      scrollTrigger: { trigger: '.method', start: 'top 80%', once: true }
    });
    gsap.from('.method-badge', {
      scale: 0.4, opacity: 0, duration: 0.8, ease: 'back.out(1.8)', delay: 0.5,
      scrollTrigger: { trigger: '.method', start: 'top 80%', once: true }
    });
    gsap.from('.steps li, .method .btn-row', {
      y: 30, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: '.steps', start: 'top 85%', once: true }
    });

    /* Valutazione, servizi, contatti */
    gsap.from('.valuation-inner', {
      y: 60, scale: 0.97, opacity: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '.valuation', start: 'top 85%', once: true }
    });
    gsap.from('.service-card', {
      y: 50, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: '.services', start: 'top 85%', once: true }
    });
    reveal('.contact-info, #contactForm', { stagger: 0.15 }, '.contact-grid');
    gsap.from('.chip', {
      y: 16, opacity: 0, duration: 0.5, stagger: 0.03, ease: 'power2.out',
      scrollTrigger: { trigger: '.chips', start: 'top 90%', once: true }
    });

    /* ---------- Magnet: pulsanti principali ---------- */
    if (finePointer) {
      document.querySelectorAll('.finder-btn, .hero-cta, .call-pill, .primary-btn, .red-btn').forEach((btn) => {
        const toX = gsap.quickTo(btn, 'x', { duration: 0.4, ease: 'power3.out' });
        const toY = gsap.quickTo(btn, 'y', { duration: 0.4, ease: 'power3.out' });
        btn.addEventListener('pointermove', (e) => {
          const r = btn.getBoundingClientRect();
          toX((e.clientX - (r.left + r.width / 2)) * 0.25);
          toY((e.clientY - (r.top + r.height / 2)) * 0.35);
        });
        btn.addEventListener('pointerleave', () => { toX(0); toY(0); });
      });
    }

    /* Ricalcola le posizioni quando cambiano annunci o lingua */
    document.addEventListener('langchange', () => ScrollTrigger.refresh());
    window.addEventListener('load', () => ScrollTrigger.refresh());
  }

  document.addEventListener('DOMContentLoaded', init);
})();
