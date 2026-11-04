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

## Funzioni

- Ricerca per contratto, categoria, tipologia e comune
- Preferiti (cuore sugli annunci, salvati nel browser del visitatore)
- Modulo contatti e modulo valutazione: aprono WhatsApp (328.6568572) o l'email
  `info@immobiliare-emmedue.it` con il messaggio già compilato (nessun server necessario)
- Mappa della sede, pulsante WhatsApp sempre visibile, chip "Più cercati"

## Da completare

- Foto hero: ora è una foto generica da Unsplash; sostituirla con una foto vostra.
- Le foto degli annunci sono ritagliate dagli screenshot del sito attuale: meglio usare gli originali.
- Annuncio "Appartamento – Modena, Viali": mancano camere, bagni e mq.
- Il "Negozio in vendita – Modena" non è inserito (prezzo e dati non leggibili).
- Link Privacy / Cookies: collegarli alle pagine reali.
- Versioni EN / ES non ancora presenti.
