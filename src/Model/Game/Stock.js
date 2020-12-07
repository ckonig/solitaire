import Card from "../Deck/Card";

export default class Stock {
    constructor(stack) {
        this.stack = [...stack];
    }

    recycle(waste) {
        if (waste.length) {
            this.stack = waste.reverse().map((element) => {
                element.causeEntropy(3);
                element.isHidden = true;
                return element;
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

    trip = () => {
        const randomElement = this.stack[Math.floor(Math.random() * this.stack.length)];
        randomElement && randomElement.causeEntropy(4);      
        return this;
    }
}
