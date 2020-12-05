import Card from "../Deck/Card";

export default class Stock {
    constructor(stack) {
        this.stack = [...stack];
    }

    recycle(waste) {
        if (waste.length) {
            this.stack = [...waste].reverse().map((element) => {
                return { ...element, isHidden: true };
            });
            return true;
        }

        return false;
    }

    isOnTop = (card) => card && card.equals(this.getTop());

    getTop = () => this.stack[this.stack.length - 1];

    static copy = (orig) => {
        const copy = new Stock([]);
        copy.stack = Card.copyAll(orig.stack);
        return copy;
    }
}
