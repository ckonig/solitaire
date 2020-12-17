import Card from "../Deck/Card";

export default class Stock {
    constructor(stack, settings) {
        this.settings = settings;
        this.stack = stack.map(this.setCardProperties);
        this.dealt = 0;
        this.dealingAt = 0;
        this.isDealt = false;
        this.recyclings = 0;
        this.passes = -1;
        if (this.settings.launchSettings.recyclingMode == "1-pass") {
            this.passes = 1;
        }
        if (this.settings.launchSettings.recyclingMode == "3-pass") {
            this.passes = 3;
        }
    }

    canRecycle() {
        return (
            this.settings.launchSettings.recyclingMode == "infinite" ||
            (this.settings.launchSettings.recyclingMode == "3-pass" && this.recyclings < 2)
        );
    }

    recycle = (waste) => {
        if (waste.length) {
            this.stack = waste.reverse().map(this.setCardProperties);
            this.recyclings++;
            return true;
        }

        return false;
    }

    setCardProperties = (card) => {
        card.causeEntropy(Math.min(this.settings.interactionEntropy, 1));
        card.isHidden = true;
        card.source = "stock";
        return card;
    };

    isOnTop = (card) => card && card.equals(this.getTop());

    getTop = () => this.stack[this.stack.length - 1];

    popTop = () => {
        let result = [];
        if (this.settings.launchSettings.drawMode == "single") {
            result = [this.stack.pop()];
        }
        if (this.settings.launchSettings.drawMode == "triple") {
            result = this.stack.splice(this.stack.length - 3);
        }
        if (this.stack.length == 0) {
            this.passes--;
        }

        return result;
    };

    static copy = (orig) => {
        const copy = new Stock([], orig.settings);
        copy.stack = Card.copyAll(orig.stack);
        copy.dealt = orig.dealt;
        copy.dealingAt = orig.dealingAt;
        copy.isDealt = orig.isDealt;
        copy.passes = orig.passes;
        copy.recyclings = orig.recyclings;
        return copy;
    };

    setEntropy = (lvl) => {
        this.stack.forEach((element) => element.causeEntropy(Math.min(lvl, 1)));
        return this;
    };

    deal = (tableau) => {
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
