import Card from "../Deck/Card";

export default class Focus {
    constructor() {
        this.card = null;
        this.stack = null;
    }

    setCard = (card) => {
        this.card = card;
        this.stack = null;
    };

    setStack = (stack) => {
        this.card = null;
        this.stack = stack;
    }

    hasCard = (card) => {
        return this.card && card && Card.equals(this.card, card);
    };

    hasStack = (stack) => {
        return this.stack && stack && this.stack == stack;
    }
}
