export default class Hand {

    constructor() {
        this.stack = [];
        this.source = null;
    }

    pickUp(stack, source) {
        this.stack = stack;
        this.source = source;
    }

    putDown() {
        var cards = [...this.stack]
        this.stack = [];
        this.source = null;
        return cards;
    }

    isHoldingCard() {
        return !!this.stack.length;
    }

    isHoldingKing() {
        return this.currentCard() && this.currentCard().props && this.currentCard().props.face == 'K'
    }

    isCurrentCard(card) {
        return card && this.currentCard() == card;
    }

    currentCard() {
        return this.isHoldingCard() && this.stack[0];
    }

    containsCurrentCard(stack) {
        return stack && stack.indexOf(this.currentCard().props) !== -1
    }

    isFromCurrentSource(card) {
        return this.source && card.props.source == this.source;
    }
}