# Sito Immobiliare eMMe due

Sito statico (HTML/CSS/JS, nessun build) per Immobiliare eMMedue S.A.S – Modena.
Stile ispirato a una landing immobiliare moderna: hero blu con foto, barra di ricerca
flottante, carosello "Ultimi inseriti", sezione Vendi, valutazione gratuita, contatti.

## Come vederlo

Apri `index.html` nel browser, oppure:

```bash
python3 -m http.server 8000   # poi http://localhost:8000
```

Si pubblica su qualunque hosting statico (GitHub Pages, Netlify, l'hosting attuale…).

## Aggiungere o modificare un immobile

Modifica `listings.js`: ogni annuncio è un blocco `{ ... }` con tipologia, contratto,
comune, camere, bagni, mq, prezzo, eventuale prezzo precedente (per il ribasso) e foto
(in `img/`). I campi `null` non vengono mostrati.

## Traduzioni

Tutti i testi tradotti sono in `i18n.js` (voce italiana → inglese, spagnolo). Per un annuncio,
la descrizione in `listings.js` può essere scritta come `{ it: '…', en: '…', es: '…' }`.
I messaggi che arrivano all'agenzia (WhatsApp/email) restano sempre in italiano.

## Funzioni

- Ricerca per contratto, categoria, tipologia e comune
- Scheda "Dettagli" per ogni annuncio: galleria foto, superficie, locali, camere, bagni,
  descrizione, caratteristiche e pulsanti WhatsApp / Chiama / Scrivici
- Preferiti (cuore sugli annunci, salvati nel browser del visitatore)
- Modulo contatti e modulo valutazione: aprono WhatsApp (328.6568572) o l'email
  `info@immobiliare-emmedue.it` con il messaggio già compilato (nessun server necessario)
- Mappa della sede, pulsante WhatsApp sempre visibile, chip "Più cercati"
- Tre lingue (IT / EN / ES) con selettore in alto (nel menu su telefono); la scelta viene ricordata.
  Link diretti: `index.html?lang=en`, `index.html?lang=es`

## Prima della messa online

Il sito è ora una **demo** per la proposta all'agenzia: in `index.html` c'è
`<meta name="robots" content="noindex, nofollow">`, che impedisce a Google di indicizzarlo.
Quando va online sul dominio dell'agenzia, **togliere quella riga**.

Alla messa online, inoltre:
- verificare che `<link rel="canonical">` punti all'indirizzo definitivo (ora `https://www.immobiliare-emmedue.it/`);
- aggiungere `<meta property="og:image">` con l'indirizzo completo di una foto (anteprima su WhatsApp/Facebook);
- aggiungere `robots.txt` e `sitemap.xml`, e registrare il sito su Google Search Console e Google Business Profile.

## Qualità (verificata)

- Accessibilità WCAG 2.1 AA: 0 violazioni con axe-core, scheda dettaglio navigabile da tastiera
  (il resto della pagina è bloccato mentre è aperta), errori dei moduli segnalati sui campi.
- Contrasti ≥ 4,5:1, tasti ≥ 44 px su telefono, zoom 200% senza scorrimento orizzontale.
- Immagini in WebP (circa la metà del peso), logo ridimensionato.
- SEO: titolo e descrizione con parole chiave, dati strutturati `RealEstateAgent`
  (indirizzo, telefoni, P.IVA, zone servite), anteprima link Open Graph, favicon.

## Da completare

- Foto hero: ora è una foto generica da Unsplash; sostituirla con una foto vostra.
- Le foto degli annunci sono ritagliate dagli screenshot del sito attuale: meglio usare gli originali.
- San Giorgio di Piano: la descrizione si interrompe a "dotata di cappotto" (manca il seguito);
  mancano le altre foto della galleria (corridoio, armadi, cucina…).
- Annuncio "Appartamento – Modena, Viali": mancano camere, bagni e mq.
- Il "Negozio in vendita – Modena" non è inserito (prezzo e dati non leggibili).
- Link Privacy / Cookies: collegarli alle pagine reali.
