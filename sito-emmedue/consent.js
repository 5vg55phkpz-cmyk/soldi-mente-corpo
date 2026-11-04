/*
 * Consenso cookie, mappa di Google e informative (privacy / cookie).
 * - Senza consenso il sito usa solo memoria tecnica (preferiti, lingua, scelta cookie).
 * - La mappa di Google si carica solo dopo "Accetta" o "Mostra la mappa".
 * - La scelta vale 6 mesi, poi il banner ricompare (linee guida Garante Privacy, 2021).
 */
(() => {
  const KEY = 'emmedue-consenso';
  const VALID_DAYS = 182;
  const MAP_SRC = 'https://maps.google.com/maps?q=Via%20Luosi%20154%2C%2041124%20Modena&z=16&output=embed';
  const $ = (s) => document.querySelector(s);
  const t = (s) => (window.I18N ? window.I18N.t(s) : s);

  function read() {
    try {
      const c = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (!c || !c.at) return null;
      const age = (Date.now() - new Date(c.at).getTime()) / 86400000;
      return age >= 0 && age < VALID_DAYS ? c : null;
    } catch { return null; }
  }
  function save(maps) {
    try { localStorage.setItem(KEY, JSON.stringify({ maps, at: new Date().toISOString() })); } catch { /* storage non disponibile */ }
  }

  /* ---------- Mappa ---------- */
  let placeholder = null;
  function loadMap() {
    const box = $('#mapConsent');
    if (!box) return;
    placeholder = box;
    const iframe = document.createElement('iframe');
    iframe.title = t('Mappa: Via Luosi 154, Modena');
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    iframe.src = MAP_SRC;
    iframe.id = 'mapFrame';
    box.replaceWith(iframe);
  }
  function unloadMap() {
    const frame = $('#mapFrame');
    if (frame && placeholder) frame.replaceWith(placeholder);
  }

  /* ---------- Banner ---------- */
  const banner = $('#cookieBanner');
  function showBanner() {
    banner.classList.remove('hidden');
    document.body.classList.add('has-cookie-banner');
  }
  function hideBanner() {
    banner.classList.add('hidden');
    document.body.classList.remove('has-cookie-banner');
  }
  function decide(accept) {
    save(accept);
    hideBanner();
    accept ? loadMap() : unloadMap();
  }

  /* ---------- Informative ---------- */
  const legal = $('#legal');
  let lastFocus = null;
  function setInert(on) {
    [...document.body.children].forEach((el) => {
      if (el !== legal && el.tagName !== 'SCRIPT') el.inert = on;
    });
  }
  function openLegal(which) {
    legal.querySelectorAll('.legal-doc').forEach((d) => { d.hidden = d.id !== `doc-${which}`; });
    legal.setAttribute('aria-labelledby', which === 'cookie' ? 'cookieTitle' : 'legalTitle');
    if (legal.classList.contains('hidden')) lastFocus = document.activeElement;
    legal.classList.remove('hidden');
    setInert(true);
    document.body.style.overflow = 'hidden';
    legal.scrollTop = 0;
    $('#legalClose').focus();
  }
  function closeLegal() {
    if (legal.classList.contains('hidden')) return;
    legal.classList.add('hidden');
    setInert(false);
    document.body.style.overflow = '';
    if (/^#(privacy|cookie)-policy$/.test(location.hash)) history.replaceState(null, '', location.pathname + location.search);
    lastFocus?.focus?.();
  }
  function route() {
    const m = location.hash.match(/^#(privacy|cookie)-policy$/);
    if (m) openLegal(m[1]);
  }

  document.addEventListener('DOMContentLoaded', () => {
    const cookieH2 = legal.querySelector('#doc-cookie h2');
    if (cookieH2) cookieH2.id = 'cookieTitle';

    const c = read();
    if (c) { if (c.maps) loadMap(); } else showBanner();

    document.addEventListener('click', (e) => {
      const choice = e.target.closest('[data-consent]');
      if (choice) return decide(choice.dataset.consent === 'accept');
      if (e.target.closest('[data-cookie-settings]')) {
        closeLegal();
        showBanner();
        banner.querySelector('[data-consent="accept"]').focus();
        return;
      }
      if (e.target.closest('#mapLoad')) {
        save(true);
        loadMap();
        hideBanner();
        return;
      }
      const link = e.target.closest('a[href="#privacy-policy"], a[href="#cookie-policy"]');
      if (link) {
        e.preventDefault();
        const which = link.getAttribute('href').includes('cookie') ? 'cookie' : 'privacy';
        history.pushState(null, '', link.getAttribute('href'));
        openLegal(which);
      }
    });

    $('#legalClose').addEventListener('click', closeLegal);
    legal.addEventListener('click', (e) => { if (e.target === legal) closeLegal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLegal(); });
    window.addEventListener('hashchange', route);
    window.addEventListener('popstate', () => { if (!/^#(privacy|cookie)-policy$/.test(location.hash)) closeLegal(); else route(); });
    route();
  });
})();
