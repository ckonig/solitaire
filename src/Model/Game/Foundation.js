import Suits from "../Deck/Suits";
import { getFoundationOrder } from "../Deck/DeckSize";

export default class Foundation {
    constructor() {
        const template = () => ({
            stack: [],
            acceptedCards: [...getFoundationOrder()],
            usedCards: [],
            icon: null,
            color: null,
        });
        const stacks = Object.keys(Suits)
            .map((key) => Suits[key])
            .map((suit) => ({ ...template(), ...suit }));
        this.stacks = [...stacks];
    }

    getCurrentAccepted = (index) => {
        const currentFoundation = this.stacks[index].acceptedCards;
        return currentFoundation[currentFoundation.length - 1];
    };

    //@todo same (similar) in tableau
    accepts = (index, card) => {
        const currentAccepted = this.getCurrentAccepted(index);
        return this.stacks[index].icon == card.type.icon && currentAccepted == card.face;
    };

    add = (index, card) => {
        card.source = "foundation-" + index;
        this.stacks[index].stack.push(card);
        this.stacks[index].usedCards.push(this.stacks[index].acceptedCards.pop());
    };

    remove = (index, card) => {
        this.stacks[index].acceptedCards.push(this.stacks[index].usedCards.pop());
        return card && card.equals(this.getTop(index)) && this.stacks[index].stack.pop();
    };

    getPreviousUsed = (index) => {
        return [...this.stacks[index].usedCards].pop();
    };

    countCards = () => {
        this.stacks.map((f) => parseInt(f.stack.length)).reduce((a, b) => a + b, 0);
    };

    getTop(index) {
        return this.stacks[index].stack[this.stacks[index].stack.length - 1];
    }
}
