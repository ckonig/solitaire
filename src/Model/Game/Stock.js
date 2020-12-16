import Card from "../Deck/Card";

export default class Stock {
    constructor(stack, settings) {
        this.settings = settings;
        this.stack = stack;
        this.dealt = 0;
        this.dealingAt = 0;
        this.isDealt = false;
    }

    recycle(waste) {
        if (waste.length) {
            this.stack = waste.reverse().map((element) => {
                element.causeEntropy(Math.min(this.settings.interactionEntropy, 1));
                element.isHidden = true;
                return element;
            });
            return true;
        }

        return false;
    }

    isOnTop = (card) => card && card.equals(this.getTop());

    getTop = () => this.stack[this.stack.length - 1];

    popTop = () => {
        if (this.settings.launchSettings.drawMode == "single") {
            return [this.stack.pop()];
        }
        if (this.settings.launchSettings.drawMode == "triple") {
            return this.stack.splice(this.stack.length-3);
        }
    }

    static copy = (orig) => {
        const copy = new Stock([], orig.settings);
        copy.stack = Card.copyAll(orig.stack);
        copy.dealt = orig.dealt;
        copy.dealingAt = orig.dealingAt;
        copy.isDealt = orig.isDealt;
        return copy;
    }

    setEntropy = (lvl) => {
        this.stack.forEach(element => element.causeEntropy(Math.min(lvl,1)));
        return this;
    }

    deal(tableau) {
        for (let i = this.dealingAt; i < tableau.stacks.length; i++) {
            const stack = tableau.stacks[i].stack;
            if (stack.length <= tableau.stacks.length - i - 1) {
                const newCard = this.stack.pop();
                newCard.source = "tableau-" + i;
                if (stack.length == tableau.stacks.length - 1 - i) {
                    newCard.isHidden = false;
                }
                stack.push(newCard);
                this.dealt++;
                this.dealingAt++;
                if (this.dealingAt == tableau.stacks.length) {
                    this.dealingAt = 0;
                }
                this.isDealt = false;
                return;
            } else {
                const isFirst = this.dealingAt == 0;
                this.dealingAt = 0;
                this.isDealt = isFirst;
                return;
            }
        }

        this.isDealt = true;
    }
}
