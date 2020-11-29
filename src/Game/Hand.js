export default class Hand {
    
    constructor(stateholder) {
        this.stateHolder = stateholder;
    }

    state() {
        return this.stateHolder.state;
    }

    isHoldingCard() {
        return !!this.state().hand.stack.length;
    }

    isHoldingKing() {
        return this.currentCard() && this.currentCard().props && this.currentCard().props.face == 'K'
    }

    isCurrentCard(card) {
        return card && this.currentCard() == card;
    }

    currentCard() {
        return this.isHoldingCard() && this.state().hand.stack[0];
    }

    containsCurrentCard(stack) {
        return stack && stack.indexOf(this.currentCard().props) !== -1
    }

    isFromCurrentSource(card) {
        return this.state().hand.source && card.props.source == this.state().hand.source;
    }
}