/*
 * Elenco immobili mostrati nel sito.
 * Per aggiungere un annuncio copia un blocco { ... } e modifica i campi.
 * I campi lasciati a null non vengono mostrati.
 *
 *   contract:  'Vendita' | 'Affitto'
 *   category:  'Residenziale' | 'Commerciale'
 *   type:      'Appartamento' | 'Villa' | 'Ufficio' | 'Negozio' | ...
 *   rooms:     camere da letto        locali: numero di locali
 *   oldPrice:  prezzo precedente (per mostrare il ribasso), altrimenti null
 *   images:    elenco foto (la prima è la copertina)
 *   description: testo della scheda "Dettagli"; può essere una stringa o { it, en, es }
 *   features: caratteristiche (in italiano; le traduzioni sono in i18n.js)
 */
window.LISTINGS = [
  {
    id: 'app-san-giorgio',
    type: 'Appartamento',
    contract: 'Vendita',
    category: 'Residenziale',
    town: 'San Giorgio di Piano',
    zone: null,
    locali: 3,
    rooms: 2,
    baths: 1,
    sqm: 95,
    price: 260000,
    oldPrice: null,
    images: [
      'img/sangiorgio-soggiorno.jpg',
      'img/sangiorgio-esterno.jpg',
      'img/sangiorgio-soggiorno-2.jpg'
    ],
    description: {
      it: 'Splendido trilocale con terrazzo abitabile e garage. A San Giorgio di Piano, in posizione strategica ' +
        'limitrofa al centro e comoda a tutti i servizi, proponiamo in vendita un appartamento impeccabile ' +
        "situato al primo piano con ascensore. L'immobile si trova all'interno di una palazzina del 2008, " +
        'completamente priva di barriere architettoniche e dotata di cappotto.',
      en: 'Beautiful three-room apartment with a large usable terrace and garage. In San Giorgio di Piano, in a ' +
        'convenient location next to the town centre and close to all amenities, we offer for sale an immaculate ' +
        'apartment on the first floor with lift. The property is in a 2008 building, fully step-free and with ' +
        'external thermal insulation.',
      es: 'Espléndido piso de tres habitaciones con terraza habitable y garaje. En San Giorgio di Piano, en una ' +
        'ubicación estratégica junto al centro y cerca de todos los servicios, ponemos a la venta un apartamento ' +
        'impecable en primera planta con ascensor. El inmueble se encuentra en un edificio de 2008, totalmente ' +
        'sin barreras arquitectónicas y con aislamiento térmico exterior.'
    },
    features: ['Terrazzo abitabile', 'Garage', 'Primo piano con ascensore', 'Palazzina del 2008', 'Senza barriere architettoniche', 'Cappotto']
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
    images: ['img/appartamento-modena.jpg']
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
    images: ['img/ufficio-modena.jpg']
  }
];

/* Comuni proposti nella ricerca e nei "Più cercati" */
window.TOWNS = ['Modena', 'Formigine', 'Camposanto', 'San Prospero', 'San Giorgio di Piano', 'Mirandola'];
