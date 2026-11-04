(() => {
  const WHATSAPP = '393286568572';
  const EMAIL = 'info@immobiliare-emmedue.it';
  const FAV_KEY = 'emmedue-preferiti';

  const listings = window.LISTINGS || [];
  const towns = window.TOWNS || [];
  const $ = (sel) => document.querySelector(sel);

  const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const euro = (n) => `${Number(n).toLocaleString('it-IT', { useGrouping: 'always' })} €`;

  /* ---------- Preferiti ---------- */
  function loadFavs() {
    try { return new Set(JSON.parse(localStorage.getItem(FAV_KEY) || '[]')); } catch { return new Set(); }
  }
  function saveFavs() {
    try { localStorage.setItem(FAV_KEY, JSON.stringify([...favs])); } catch { /* storage non disponibile */ }
  }
  const favs = loadFavs();
  let showOnlyFavs = false;
  let filters = {};

  /* ---------- Icone ---------- */
  const icons = {
    bed: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M3 18V7M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5"/><circle cx="7" cy="11" r="1.6"/></svg>',
    bath: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M4 12h16v2a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M6 12V6a2 2 0 0 1 3.5-1.3"/><path d="M7 19l-1 2M17 19l1 2"/></svg>',
    area: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 9h5V4M15 20v-5h5"/></svg>',
    heart: '<svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2"><path d="M12 21s-7.5-4.6-9.6-9.3C.9 8.3 3.2 4.5 7 4.5c2 0 3.5 1.1 5 2.9 1.5-1.8 3-2.9 5-2.9 3.8 0 6.1 3.8 4.6 7.2C19.5 16.4 12 21 12 21z"/></svg>',
    down: '<svg viewBox="0 0 24 12" width="22" height="11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 2l7 6 4-4 9 7M21 6v5h-5"/></svg>'
  };

  /* ---------- Annunci ---------- */
  function cardHtml(l) {
    const place = l.zone ? `${l.town} · ${l.zone}` : l.town;
    const stats = [
      l.rooms != null && `<span title="Camere">${icons.bed}${l.rooms}</span>`,
      l.baths != null && `<span title="Bagni">${icons.bath}${l.baths}</span>`,
      l.sqm != null && `<span title="Superficie">${icons.area}${l.sqm} mq</span>`
    ].filter(Boolean).join('');
    const drop = l.oldPrice && l.oldPrice > l.price
      ? `<span class="price-drop">${icons.down}-${(((l.oldPrice - l.price) / l.oldPrice) * 100).toFixed(1).replace('.', ',')}% <s>${euro(l.oldPrice)}</s></span>`
      : '';
    const isFav = favs.has(l.id);

    return `
      <article class="listing-card">
        <div class="listing-photo" data-detail="${esc(l.id)}">
          <img src="${esc(l.images[0])}" alt="${esc(`${l.type} in ${l.contract.toLowerCase()} a ${place}`)}" loading="lazy" />
          <span class="badge">${esc(l.contract)}</span>
          <button class="fav-btn${isFav ? ' active' : ''}" type="button" data-fav="${esc(l.id)}"
            aria-pressed="${isFav}" aria-label="${isFav ? 'Rimuovi dai' : 'Aggiungi ai'} preferiti">${icons.heart}</button>
        </div>
        <div class="listing-body">
          <p class="listing-place">${esc(place)}</p>
          <h3><button type="button" class="title-btn" data-detail="${esc(l.id)}">${esc(l.type)} in ${esc(l.contract.toLowerCase())}</button></h3>
          ${stats ? `<div class="listing-stats">${stats}</div>` : ''}
          <div class="listing-foot">
            <p class="listing-price">${euro(l.price)} ${drop}</p>
            <button class="info-link" type="button" data-detail="${esc(l.id)}">Dettagli</button>
          </div>
        </div>
      </article>`;
  }

  function renderListings() {
    const track = $('#listingTrack');
    const active = Object.values(filters).some(Boolean);
    let list = listings.filter((l) =>
      (!filters.contract || l.contract === filters.contract) &&
      (!filters.category || l.category === filters.category) &&
      (!filters.type || l.type === filters.type) &&
      (!filters.town || l.town === filters.town)
    );
    if (showOnlyFavs) list = list.filter((l) => favs.has(l.id));

    $('#listingsTitle').textContent = showOnlyFavs ? 'I tuoi preferiti' : active ? 'Risultati della ricerca' : 'Ultimi inseriti';
    $('#resetRow').classList.toggle('hidden', !(active || showOnlyFavs));

    track.innerHTML = list.length
      ? list.map(cardHtml).join('')
      : `<div class="empty">
          <h3>${showOnlyFavs ? 'Nessun preferito salvato' : 'Nessun immobile trovato'}</h3>
          <p>${showOnlyFavs ? 'Tocca il cuore su un annuncio per salvarlo qui.' : 'Non trovi quello che cerchi? Scrivici e lo cerchiamo noi per te.'}</p>
          ${showOnlyFavs ? '' : '<a class="primary-btn" href="#contatti" data-purpose="Cerco un immobile">Richiedi</a>'}
        </div>`;
    track.scrollLeft = 0;
    buildDots();
  }

  function updateFavCount() {
    $('#favCount').textContent = favs.size;
  }

  /* ---------- Carosello ---------- */
  const track = $('#listingTrack');
  const dots = $('#listingDots');
  const pageCount = () => Math.max(1, Math.round(track.scrollWidth / track.clientWidth));

  function buildDots() {
    const pages = pageCount();
    dots.innerHTML = Array.from({ length: pages }, (_, i) =>
      `<button type="button" role="tab" aria-label="Pagina ${i + 1}" data-page="${i}"></button>`).join('');
    dots.hidden = pages < 2;
    syncDots();
  }

  function syncDots() {
    const max = track.scrollWidth - track.clientWidth;
    const pages = pageCount();
    const index = max <= 0 ? 0 : Math.round((track.scrollLeft / max) * (pages - 1));
    dots.querySelectorAll('button').forEach((d, i) => {
      d.classList.toggle('active', i === index);
      d.setAttribute('aria-selected', String(i === index));
    });
  }

  dots.addEventListener('click', (e) => {
    const page = e.target.closest('button')?.dataset.page;
    if (page !== undefined) track.scrollTo({ left: Number(page) * track.clientWidth, behavior: 'smooth' });
  });
  track.addEventListener('scroll', () => requestAnimationFrame(syncDots), { passive: true });
  window.addEventListener('resize', buildDots);

  track.addEventListener('click', (e) => {
    const detail = !e.target.closest('[data-fav]') && e.target.closest('[data-detail]');
    if (detail) return openDetail(detail.dataset.detail);
    const btn = e.target.closest('[data-fav]');
    if (!btn) return;
    const id = btn.dataset.fav;
    favs.has(id) ? favs.delete(id) : favs.add(id);
    saveFavs();
    updateFavCount();
    if (showOnlyFavs) renderListings();
    else {
      const on = favs.has(id);
      btn.classList.toggle('active', on);
      btn.setAttribute('aria-pressed', String(on));
      btn.setAttribute('aria-label', `${on ? 'Rimuovi dai' : 'Aggiungi ai'} preferiti`);
    }
  });

  /* ---------- Scheda dettaglio ---------- */
  const detail = $('#detail');
  let current = null;
  let photo = 0;
  let lastFocus = null;

  const placeOf = (l) => (l.zone ? `${l.town} · ${l.zone}` : l.town);

  function showPhoto(i) {
    const imgs = current.images;
    photo = (i + imgs.length) % imgs.length;
    const img = $('#galleryImg');
    img.src = imgs[photo];
    img.alt = `${current.type} a ${placeOf(current)}, foto ${photo + 1} di ${imgs.length}`;
    $('#galleryCount').textContent = `${photo + 1} / ${imgs.length}`;
    $('#galleryThumbs').querySelectorAll('button').forEach((b, j) => b.classList.toggle('active', j === photo));
  }

  function openDetail(id) {
    current = listings.find((l) => l.id === id);
    if (!current) return;
    const l = current;
    const multi = l.images.length > 1;
    detail.querySelectorAll('.gallery-nav, .gallery-count').forEach((el) => { el.hidden = !multi; });
    $('#galleryThumbs').hidden = !multi;
    $('#galleryThumbs').innerHTML = l.images.map((src, i) =>
      `<button type="button" data-photo="${i}" aria-label="Foto ${i + 1}"><img src="${esc(src)}" alt="" /></button>`).join('');

    const facts = [
      ['Superficie', l.sqm != null && `${l.sqm} m²`],
      ['Locali', l.locali],
      ['Camere', l.rooms],
      ['Bagni', l.baths]
    ].filter(([, v]) => v !== null && v !== undefined && v !== false);
    const drop = l.oldPrice && l.oldPrice > l.price
      ? `<span class="price-drop">${icons.down}-${(((l.oldPrice - l.price) / l.oldPrice) * 100).toFixed(1).replace('.', ',')}% <s>${euro(l.oldPrice)}</s></span>` : '';
    const msg = `Buongiorno, vorrei informazioni su: ${l.type} in ${l.contract.toLowerCase()} a ${placeOf(l)}, ${euro(l.price)}.`;

    $('#detailBody').innerHTML = `
      <p class="listing-place">${esc(l.category)} · ${esc(placeOf(l))}</p>
      <h2 id="detailTitle">${esc(l.type)} in ${esc(l.contract.toLowerCase())}</h2>
      <p class="detail-price">${euro(l.price)} ${drop}</p>
      ${facts.length ? `<dl class="facts">${facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>` : ''}
      ${l.description ? `<p class="detail-desc">${esc(l.description)}</p>` : ''}
      ${l.features?.length ? `<ul class="features">${l.features.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>` : ''}
      <div class="detail-actions">
        <a class="red-btn" href="https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}" target="_blank" rel="noopener">Chiedi info su WhatsApp</a>
        <a class="primary-btn" href="tel:+390598723629">Chiama 059.8723629</a>
        <a class="ghost-btn" href="#contatti" id="detailForm">Scrivici</a>
      </div>`;
    $('#detailForm').addEventListener('click', () => {
      const f = $('#contactForm');
      f.purpose.value = 'Informazioni su un annuncio';
      f.message.value = msg;
      closeDetail(false);
    });

    showPhoto(0);
    lastFocus = document.activeElement;
    detail.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    detail.scrollTop = 0;
    $('#detailClose').focus();
  }

  function closeDetail(restoreFocus = true) {
    detail.classList.add('hidden');
    document.body.style.overflow = '';
    if (restoreFocus) lastFocus?.focus();
  }

  $('#detailClose').addEventListener('click', () => closeDetail());
  detail.addEventListener('click', (e) => { if (e.target === detail) closeDetail(); });
  $('#galleryPrev').addEventListener('click', () => showPhoto(photo - 1));
  $('#galleryNext').addEventListener('click', () => showPhoto(photo + 1));
  $('#galleryThumbs').addEventListener('click', (e) => {
    const b = e.target.closest('[data-photo]');
    if (b) showPhoto(Number(b.dataset.photo));
  });
  document.addEventListener('keydown', (e) => {
    if (detail.classList.contains('hidden')) return;
    if (e.key === 'Escape') closeDetail();
    if (e.key === 'ArrowLeft' && current.images.length > 1) showPhoto(photo - 1);
    if (e.key === 'ArrowRight' && current.images.length > 1) showPhoto(photo + 1);
  });
  let touchX = null;
  $('#galleryImg').addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  $('#galleryImg').addEventListener('touchend', (e) => {
    if (touchX === null || current.images.length < 2) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) showPhoto(photo + (dx < 0 ? 1 : -1));
    touchX = null;
  });

  /* ---------- Ricerca ---------- */
  const finder = $('#finder');
  $('#townSelect').insertAdjacentHTML('beforeend', towns.map((t) => `<option>${esc(t)}</option>`).join(''));

  finder.addEventListener('submit', (e) => {
    e.preventDefault();
    showOnlyFavs = false;
    setFavPressed();
    filters = {
      contract: finder.contract.value,
      category: finder.category.value,
      type: finder.type.value,
      town: finder.town.value
    };
    renderListings();
    $('#immobili').scrollIntoView({ behavior: 'smooth' });
  });

  $('#resetSearch').addEventListener('click', () => {
    filters = {};
    showOnlyFavs = false;
    setFavPressed();
    finder.reset();
    renderListings();
  });

  function setFavPressed() {
    $('#favToggle').setAttribute('aria-pressed', String(showOnlyFavs));
    $('#favToggle').classList.toggle('active', showOnlyFavs);
  }

  $('#favToggle').addEventListener('click', () => {
    showOnlyFavs = !showOnlyFavs;
    setFavPressed();
    renderListings();
    $('#immobili').scrollIntoView({ behavior: 'smooth' });
  });

  /* Più cercati */
  const chipData = towns.flatMap((t) => [
    { label: `Case in vendita a ${t}`, town: t, category: 'Residenziale' },
    { label: `Appartamenti a ${t}`, town: t, type: 'Appartamento' }
  ]);
  $('#searchedChips').innerHTML = chipData.map((c, i) => `<button type="button" class="chip" data-chip="${i}">${esc(c.label)}</button>`).join('');
  $('#searchedChips').addEventListener('click', (e) => {
    const c = chipData[e.target.closest('[data-chip]')?.dataset.chip];
    if (!c) return;
    finder.reset();
    finder.contract.value = 'Vendita';
    finder.town.value = c.town;
    finder.category.value = c.category || '';
    finder.type.value = c.type || '';
    finder.requestSubmit();
  });

  /* ---------- Menu ---------- */
  const nav = $('#siteNav');
  const toggle = $('#menuToggle');
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.addEventListener('click', (e) => {
    if (!e.target.closest('a')) return;
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });

  const sections = [...nav.querySelectorAll('a')].map((a) => document.querySelector(a.getAttribute('href')));
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      nav.querySelectorAll('a').forEach((a) => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach((s) => s && spy.observe(s));

  /* Link che precompilano il modulo contatti */
  document.addEventListener('click', (e) => {
    const link = e.target.closest('[data-purpose]');
    if (!link) return;
    const form = $('#contactForm');
    form.purpose.value = link.dataset.purpose;
    if (link.dataset.message) form.message.value = link.dataset.message;
  });

  /* ---------- Moduli ---------- */
  function send(channel, subject, lines) {
    const text = [subject, '', ...lines].join('\n');
    const url = channel === 'whatsapp'
      ? `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`
      : `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
    window.open(url, channel === 'whatsapp' ? '_blank' : '_self');
  }

  function check(form, extra) {
    const msg = form.querySelector('.form-msg');
    const invalid = [...form.elements].find((el) => el.willValidate && !el.checkValidity());
    if (invalid) {
      msg.textContent = invalid.type === 'checkbox' ? 'Per inviare devi accettare l\'informativa privacy.' : 'Compila i campi obbligatori (*).';
      msg.className = 'form-msg full error';
      invalid.focus();
      return false;
    }
    if (extra && !extra()) return false;
    msg.textContent = 'Grazie! Stiamo aprendo l\'app per inviare il messaggio.';
    msg.className = 'form-msg full ok';
    return true;
  }

  $('#contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const f = e.target;
    const ok = check(f, () => {
      if (f.antispam.value.trim() === '3') return true;
      const msg = f.querySelector('.form-msg');
      msg.textContent = 'Risposta antispam non corretta.';
      msg.className = 'form-msg full error';
      f.antispam.focus();
      return false;
    });
    if (!ok) return;
    send(e.submitter?.dataset.channel || 'email', `Contatto dal sito: ${f.purpose.value}`, [
      `Nominativo: ${f.name.value}`,
      `Email: ${f.email.value}`,
      f.phone.value ? `Telefono: ${f.phone.value}` : null,
      '',
      f.message.value
    ].filter((x) => x !== null));
  });

  $('#valuationForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const f = e.target;
    if (!check(f)) return;
    const addr = [f.address.value, f.number.value].filter(Boolean).join(' ');
    send(e.submitter?.dataset.channel || 'whatsapp', 'Richiesta valutazione immobile', [
      `Operazione: ${f.operation.value}`,
      `Tipologia: ${f.kind.value}`,
      `Indirizzo: ${addr}, ${f.city.value}`,
      f.sqm.value && `Superficie: ${f.sqm.value} mq`,
      `Nominativo: ${f.name.value}`,
      `Telefono: ${f.phone.value}`
    ].filter(Boolean));
  });

  /* ---------- Avvio ---------- */
  $('#year').textContent = new Date().getFullYear();
  updateFavCount();
  renderListings();
})();
