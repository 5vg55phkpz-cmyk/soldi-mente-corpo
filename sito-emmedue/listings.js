/*
 * Elenco immobili mostrati nel sito.
 * Per aggiungere un annuncio copia un blocco { ... } e modifica i campi.
 * I campi lasciati a null non vengono mostrati.
 *
 *   contract:  'Vendita' | 'Affitto'
 *   category:  'Residenziale' | 'Commerciale'
 *   type:      'Appartamento' | 'Villa' | 'Ufficio' | 'Negozio' | ...
 *   oldPrice:  prezzo precedente (per mostrare il ribasso), altrimenti null
 */
window.LISTINGS = [
  {
    id: 'app-san-giorgio',
    type: 'Appartamento',
    contract: 'Vendita',
    category: 'Residenziale',
    town: 'San Giorgio di Piano',
    zone: null,
    rooms: 2,
    baths: 1,
    sqm: 95,
    price: 260000,
    oldPrice: null,
    image: 'img/appartamento-san-giorgio.jpg'
  },
  {
    id: 'app-modena-viali',
    type: 'Appartamento',
    contract: 'Vendita',
    category: 'Residenziale',
    town: 'Modena',
    zone: 'Viali',
    rooms: null,
    baths: null,
    sqm: null,
    price: 248000,
    oldPrice: null,
    image: 'img/appartamento-modena.jpg'
  },
  {
    id: 'ufficio-modena',
    type: 'Ufficio',
    contract: 'Vendita',
    category: 'Commerciale',
    town: 'Modena',
    zone: null,
    rooms: 0,
    baths: 1,
    sqm: 130,
    price: 110000,
    oldPrice: 130000,
    image: 'img/ufficio-modena.jpg'
  }
];

/* Comuni proposti nella ricerca e nei "Più cercati" */
window.TOWNS = ['Modena', 'Formigine', 'Camposanto', 'San Prospero', 'San Giorgio di Piano', 'Mirandola'];
