//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
   for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
   }
}

const CardTypes = {
   'herz': {
      'icon': '♥',
      'color': 'red',
   },
   'karo': {
      'icon': '♦',
      'color': 'red',
   },
   'kreuz': {
      'icon': '♣',
      'color': 'black',
   },
   'pik': {
      'icon': '♠',
      'color': 'black',
   },
};

export const CardRange =  [
   '2',
   '3',
   '4',
   '5',
   '6',
   '7',
   '8',
   '9',
   '10',
   'J',
   'Q',
   'K',
   'A'
];

export const getDeck = () => {
   var cardRange = CardRange;

   var deck = [];
   var keys = Object.keys(CardTypes);
   for (var i = 0; i < cardRange.length; i++) {
      for (var j = 0; j < keys.length; j++) {
         var type = CardTypes[keys[j]];
         deck.push({
            'face': cardRange[i],
            'type': type,
            'key': cardRange[i] + "" + type.icon,
         });
      }
   }
   shuffleArray(deck);
   return deck;
}