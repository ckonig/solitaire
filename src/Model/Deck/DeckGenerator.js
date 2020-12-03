import { CardRange } from './CardRange';
import Deck from './Deck';
import Suits from './Suits';

export default function generateDeck() {
    var deck = [];
    var keys = Object.keys(Suits);
    for (var i = 0; i < CardRange.length; i++) {
        for (var j = 0; j < keys.length; j++) {
            var suit = Suits[keys[j]];
            var key = CardRange[i] + "" + suit.icon;
            deck.push({
                face: CardRange[i],
                type: suit,
                isHidden: true,
            });
        }
    }
    return new Deck(deck);
}