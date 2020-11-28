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

export const CardRange = [
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

export const getTargetOrder = () => {
   return ['A', ...CardRange.slice(0, CardRange.length - 2)].reverse();
}

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

function getRndInteger(min, max) {
   return Math.floor(Math.random() * (max - min)) + min;
}

export const getStacks = (deck) => {
   for (var i = 0; i < deck.length; i++) {
      deck[i].hidden = true;
   }
   var pointer = 0;
   var oldpointer = pointer; pointer += getRndInteger(4, 7);
   var stacks = [[], [], [], [], [], [], []];
   stacks[6] = deck.slice(oldpointer, pointer);
   stacks[6][stacks[6].length - 1].hidden = false;
   oldpointer = pointer; pointer += getRndInteger(2, 7);
   stacks[5] = deck.slice(oldpointer, pointer);
   stacks[5][stacks[5].length - 1].hidden = false;
   oldpointer = pointer; pointer += getRndInteger(2, 7);
   stacks[4] = deck.slice(oldpointer, pointer);
   stacks[4][stacks[4].length - 1].hidden = false;
   oldpointer = pointer; pointer += getRndInteger(2, 7);
   stacks[3] = deck.slice(oldpointer, pointer);
   stacks[3][stacks[3].length - 1].hidden = false;
   oldpointer = pointer; pointer += getRndInteger(2, 7);
   stacks[2] = deck.slice(oldpointer, pointer);
   stacks[2][stacks[2].length - 1].hidden = false;
   oldpointer = pointer; pointer += getRndInteger(2, 7);
   stacks[1] = deck.slice(oldpointer, pointer);
   stacks[1][stacks[1].length - 1].hidden && (stacks[1][stacks[1].length - 1].hidden = false);
   oldpointer = pointer; pointer += getRndInteger(2, 7);
   stacks[0] = deck.slice(oldpointer, deck.length - 1);
   stacks[0][stacks[0].length - 1] && (stacks[0][stacks[0].length - 1].hidden = false);
   return stacks;
}