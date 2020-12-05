import { DeckSize } from "./DeckSize";
import Suits from "./Suits";

export default class Deck {
    constructor() {
        const cards = [];
        const keys = Object.keys(Suits);
        for (let i = 0; i < DeckSize.length; i++) {
            for (let j = 0; j < keys.length; j++) {
                const suit = Suits[keys[j]];
                cards.push({
                    face: DeckSize[i],
                    type: suit,
                    isHidden: true,
                });
            }
        }
        this.cards = cards;
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
}
