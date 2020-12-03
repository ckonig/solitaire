import CardTools from "../Deck/CardTools";

export default class Waste {
    constructor() {
        this.stack = [];
    }

    tryPutDown(card) {
        return this.canAdd(card) && (this.add(card) || true);
    }

    add(card) {
        this.stack.push(card);
    }

    canAdd(card) {
        var top = this.getTopCard();
        return card  && (!top || CardTools.cardNotEquals(card, top));
    }

    getTopCard() {
        return this.stack[this.stack.length - 1];
    }

    filterOut(card) {
        this.stack = CardTools.filterNotEqual(this.stack, card);
    }

    recycle() {
        var ret = [...this.stack];
        this.stack = [];
        return ret;
    }
}