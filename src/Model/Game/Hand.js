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
    }

    putDown() {
        const cards = [...this.stack];
        this.stack = [];
        this.source = null;
        return cards;
    }

    isHoldingCard() {
        return !!this.stack.length;
    }

    isHoldingKing() {
        return this.currentCard() && this.currentCard().face == "K";
    }

    isCurrentCard(card) {
        return card && this.currentCard() == card;
    }

    currentCard() {
        return this.isHoldingCard() && this.stack[0];
    }

    hasMoreThanOneCard() {
        return this.stack.length > 1;
    }

    containsCurrentCard(stack) {
        return stack && stack.indexOf(this.currentCard()) !== -1;
    }

    isFromCurrentSource(card) {
        return this.source && card.source == this.source;
    }
}
