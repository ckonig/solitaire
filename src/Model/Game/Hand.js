import Card from "../Deck/Card";

export default class Hand {
    constructor() {
        this.stack = [];
        this.source = null;
        this.position = null;
    }

    pickUp(stack, source, position) {
        if (stack && stack[0]) {
            this.stack = stack;
            this.source = source;
            this.position = position;
            console.log('picked up', this.stack)
        }

        return stack;
    }

    putDown() {
        this.source = null;
        return this.stack.splice(0, this.stack.length);
    }

    isHoldingCard = () => !!this.stack.length;

    currentCard = () => this.isHoldingCard() && this.stack[0];

    hasMoreThanOneCard = () => this.stack.length > 1;

    isFromCurrentSource = (card) => this.source && card.source == this.source;

    static copy = (orig) => {
        const copy = new Hand();
        copy.stack = Card.copyAll(orig.stack)
        copy.source = orig.source;
        copy.position = orig.position;
        return copy;
    }
}
