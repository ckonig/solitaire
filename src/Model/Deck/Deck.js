import Card from "./Card";
import { DeckSize } from "./DeckSize";
import Suits from "./Suits";

export default class Deck {
    constructor() {
        const keys = Object.keys(Suits);
        this.cards = DeckSize.map((deckSize) => [...keys.map((key) => new Card(deckSize, Suits[key], true))]).flat();
        this.dealt = 0;
        this.dealingAt = 0;
        this.isDealt = false;
    }

    shuffle() {
        this.shuffleArray(this.cards);
        return this;
    }

    deal(stock, tableau) {
        for (let i = this.dealingAt; i < tableau.stacks.length; i++) {
            const stack = tableau.stacks[i].stack;
            if (stack.length <= tableau.stacks.length - i - 1) {
                const newCard = stock.stack.pop();
                newCard.source = "tableau-" + i;
                if (stack.length == tableau.stacks.length - 1 - i) {
                    newCard.isHidden = false;
                }
                stack.push(newCard);
                this.dealt++;
                this.dealingAt++;
                if (this.dealingAt == tableau.stacks.length) {
                    this.dealingAt = 0;
                }
                this.isDealt = false;
                return;
            } else {
                const isFirst = this.dealingAt == 0;
                this.dealingAt = 0;
                this.isDealt = isFirst;
                return;
            }
        }

        this.isDealt = true;
    }

    // credits: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}
