import CardTools from "../Deck/CardTools";

export default class Stock {
    constructor(stack) {
        this.stack = [...stack];
    }

    recycle(waste) {
        if (waste.length) {
            this.stack = [...waste].reverse().map(element => {
                return { ...element, isHidden: true }
            });
            return true;
        }

        return false;
    }

    getTop() {
        return this.stack[this.stack.length-1];
    }

    isOnTop(card) {
        return CardTools.cardEquals(card, this.getTop());
    }
}