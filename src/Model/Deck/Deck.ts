import Card from "./Card";
import Suits from "./Suits";
import { getFoundationOrder } from "./DeckSize";

export default class Deck {
    cards: Card[];
    constructor() {
        const keys = Object.keys(Suits);
        this.cards = getFoundationOrder()
            .map((deckSize) => [...keys.map((key) => new Card(deckSize, Suits[key], true))])
            .flat()
            .reverse();
    }

    shuffle() {
        this.shuffleArray(this.cards);
        return this;
    }

    // credits: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    shuffleArray(array: any[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    copy() {
        const result = new Deck();
        result.cards = Card.copyAll(this.cards);
        return result;
    }
}
