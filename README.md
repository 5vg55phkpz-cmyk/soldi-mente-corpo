# Soldi · Mente · Corpo

App full-stack per tenere sotto controllo **soldi**, **mente** e **corpo**:
landing page pubblica, registrazione/login e dashboard personale salvata su SQLite.

## Avvio

```bash
npm install
npm start        # http://localhost:3000
```

Variabili d'ambiente opzionali: `PORT`, `JWT_SECRET`, `DB_PATH`.

## Struttura

| File | Contenuto |
| --- | --- |
| `server.js` | API Express (`/api/register`, `/api/login`, `/api/me`, `/api/dashboard`, `/api/transactions`) |
| `db.js` | Connessione SQLite e creazione tabelle (`users`, `profiles`, `transactions`) |
| `public/index.html` | Landing page, finestra di accesso e dashboard |
| `public/styles.css` | Stile (palette blu notte + ambra, card con ombre morbide) |
| `public/app.js` | Logica frontend: carosello programmi, auth, rendering dashboard |

## Design

La landing riprende la struttura di un sito immobiliare moderno: hero a tutta
larghezza con foto e velatura blu, barra di ricerca "flottante" a cavallo tra
hero e contenuto, carosello di card "Più seguiti" e sezione metodo con immagine
e badge in vetro smerigliato.
