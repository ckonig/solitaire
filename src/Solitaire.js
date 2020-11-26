import Card from './Card';

//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

function Solitaire() {
  var stock = [];
  var activeStack = [];

  var finalStacks = [];
  var playStacks = [];

  var types = [
    { name: 'pik', color: 'black' },
    { name: 'herz', color: 'red' },
    { name: 'karo', color: 'red' },
    { name: 'kreuz', color: 'black' }
  ];

  var cardRange = [
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

  var deck = [];
  for (var i = 0; i < cardRange.length; i++) {
    for (var j = 0; j < types.length; j++) {
      deck.push({
        'face': cardRange[i],
        'type': types[j]
      });
    }
  }

  shuffleArray(deck);

  var output = [];

  for (var i = 0; i < deck.length; i++) {
    var card = deck[i];
    output.push(<Card type={card.type} face={card.face} />);
  }

  return (<span>{output}</span>);
}

export default Solitaire;