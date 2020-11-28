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
         var key = cardRange[i] + "" + type.icon;
         deck.push({
            'face': cardRange[i],
            'type': type,
            'key': key,
            'hidden': true,
            toString: () => key,
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
   const getStack = (id) => {
      var template = { stack: [], id };
      return { ...template };
   }
   var pointer = 0;
   var oldpointer = pointer; pointer += getRndInteger(4, 7);
   var stacks = [getStack(0), getStack(1), getStack(2), getStack(3), getStack(4), getStack(5), getStack(6)];
   stacks[6].stack = deck.slice(oldpointer, pointer);
   stacks[6].stack[stacks[6].stack.length - 1].hidden = false;
   oldpointer = pointer; pointer += getRndInteger(2, 7);
   stacks[5].stack = deck.slice(oldpointer, pointer);
   stacks[5].stack[stacks[5].stack.length - 1].hidden = false;
   oldpointer = pointer; pointer += getRndInteger(2, 7);
   stacks[4].stack = deck.slice(oldpointer, pointer);
   stacks[4].stack[stacks[4].stack.length - 1].hidden = false;
   oldpointer = pointer; pointer += getRndInteger(2, 7);
   stacks[3].stack = deck.slice(oldpointer, pointer);
   stacks[3].stack[stacks[3].stack.length - 1].hidden = false;
   oldpointer = pointer; pointer += getRndInteger(2, 7);
   stacks[2].stack = deck.slice(oldpointer, pointer);
   stacks[2].stack[stacks[2].stack.length - 1].hidden = false;
   oldpointer = pointer; pointer += getRndInteger(2, 7);
   stacks[1].stack = deck.slice(oldpointer, pointer);
   stacks[1].stack[stacks[1].stack.length - 1].hidden && (stacks[1].stack[stacks[1].stack.length - 1].hidden = false);
   oldpointer = pointer; pointer += getRndInteger(2, 7);
   stacks[0].stack = deck.slice(oldpointer, deck.length - 1);
   stacks[0].stack[stacks[0].stack.length - 1] && (stacks[0].stack[stacks[0].stack.length - 1].hidden = false);
   return stacks;
}