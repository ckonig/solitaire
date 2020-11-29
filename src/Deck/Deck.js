import { CardRange } from './CardRange';
import Suits from './Suits';

//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export const getDeck = () => {
    var cardRange = CardRange;

    var deck = [];
    var keys = Object.keys(Suits);
    for (var i = 0; i < cardRange.length; i++) {
        for (var j = 0; j < keys.length; j++) {
            var suit = Suits[keys[j]];
            var key = cardRange[i] + "" + suit.icon;
            deck.push({
                'face': cardRange[i],
                'type': suit,
                'key': key,
                'hidden': true,
                toString: () => key,
            });
        }
    }
    shuffleArray(deck);
    return deck;
}