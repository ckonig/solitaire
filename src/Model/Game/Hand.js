export default class Hand {
    constructor() {
        this.stack = [];
        this.source = null;
    }

    pickUp(stack, source) {
        if (stack) {
            this.stack = stack;
            this.source = source;
        }

        return stack;
    }

    putDown() {
        const cards = [...this.stack];
        this.stack = [];
        this.source = null;
        return cards;
    }

    isHoldingCard = () => !!this.stack.length;

    isHoldingKing = () => this.currentCard() && this.currentCard().face == "K";

    isCurrentCard = (card) => card && this.currentCard() == card;

    currentCard = () => this.isHoldingCard() && this.stack[0];

    hasMoreThanOneCard = () => this.stack.length > 1;

    containsCurrentCard = (stack) => stack && stack.indexOf(this.currentCard()) !== -1;

    isFromCurrentSource = (card) => this.source && card.source == this.source;
}
