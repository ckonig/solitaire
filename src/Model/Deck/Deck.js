import Card from "./Card";
import { DeckSize } from "./DeckSize";
import Suits from "./Suits";

export default class Deck {
    constructor() {
        const keys = Object.keys(Suits);
        this.cards = DeckSize.map((deckSize) => [...keys.map((key) => new Card(deckSize, Suits[key], true))])
            .flat()
            .reverse();
    }

    shuffle() {
        this.shuffleArray(this.cards);
        return this;
    }

    // credits: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    shuffleArray(array) {
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
