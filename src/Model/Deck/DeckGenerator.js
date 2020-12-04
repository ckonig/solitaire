import { CardRange } from "./CardRange";
import Deck from "./Deck";
import Suits from "./Suits";

export default function generateDeck() {
    const deck = [];
    const keys = Object.keys(Suits);
    for (let i = 0; i < CardRange.length; i++) {
        for (let j = 0; j < keys.length; j++) {
            const suit = Suits[keys[j]];
            deck.push({
                face: CardRange[i],
                type: suit,
                isHidden: true,
            });
        }
    }
    return new Deck(deck);
}
