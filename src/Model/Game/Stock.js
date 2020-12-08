import Card from "../Deck/Card";

export default class Stock {
    constructor(stack, settings) {
        this.settings = settings;
        this.stack = [...stack];
    }

    recycle(waste) {
        if (waste.length) {
            this.stack = waste.reverse().map((element) => {
                element.causeEntropy(Math.min(this.settings.entropyLevel, 1));
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
        const copy = new Stock([], orig.settings);
        copy.stack = Card.copyAll(orig.stack);
        return copy;
    }

    setEntropy = (lvl) => {
        this.stack.forEach(element => element.causeEntropy(Math.min(lvl,1)));
        return this;
    }
}
