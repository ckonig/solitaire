import CardTools from "../Deck/CardTools";

export default class Waste {
    constructor() {
        this.stack = [];
    }

    tryPutDown(card) {
        return this.canAdd(card) && (this.add(card) || true);
    }

    add(card) {
        this.stack.push(card.props);
    }

    canAdd(card) {
        var top = this.getTopCard();
        return card && card.props && (!top || CardTools.cardNotEquals(card.props, top));
    }

    getTopCard() {
        return this.stack[this.stack.length - 1];
    }

    filterOut(card) {
        this.stack = CardTools.filterNotEqual(this.stack, card);
    }
}