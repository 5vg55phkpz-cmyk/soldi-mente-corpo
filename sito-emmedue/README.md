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

## Da completare

- Foto hero: ora è una foto generica da Unsplash; sostituirla con una foto vostra.
- Le foto degli annunci sono ritagliate dagli screenshot del sito attuale: meglio usare gli originali.
- San Giorgio di Piano: la descrizione si interrompe a "dotata di cappotto" (manca il seguito);
  mancano le altre foto della galleria (corridoio, armadi, cucina…).
- Annuncio "Appartamento – Modena, Viali": mancano camere, bagni e mq.
- Il "Negozio in vendita – Modena" non è inserito (prezzo e dati non leggibili).
- Link Privacy / Cookies: collegarli alle pagine reali.
