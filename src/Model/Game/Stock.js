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

    isOnTop = (card) => Card.equals(card, this.getTop());

    getTop = () => this.stack[this.stack.length - 1];
}
