import BasicStack from "./BasicStack";
import Card from "../Deck/Card";

export default class Stock extends BasicStack {
    constructor(stack, settings) {
        super("stock");
        this.settings = settings;
        this.stack = stack.map(this.setCardProperties);
        this.recyclings = 0;
        this.passes = -1;
        // eslint-disable-next-line no-unused-vars
        this.blinkFor = 0;
        this.unblink = () => {};
        if (this.settings.launchSettings.recyclingMode == "1-pass") {
            this.passes = 1;
        }
        if (this.settings.launchSettings.recyclingMode == "3-pass") {
            this.passes = 3;
        }
    }

    setOnClick = (onClick) => {
        this.clickEmpty = (p) => onClick(null, p);
        this.stack.forEach((card,index) => {
            card.onClick = (p) => onClick({...card}, p);
            card.canClick = () => index == this.stack.length-1;
        });
    };

    popOne = () => {
        const result = this.stack.pop();
        return result;
    };

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
    };

    setCardProperties = (card) => {
        card.causeEntropy(Math.min(this.settings.interactionEntropy, 1));
        card.isHidden = true;
        card.source = this.source;
        return card;
    };

    isOnTop = (card) => card && card.equals(this.getTop());

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
        const copy = new Stock([], orig.settings, orig.focus);
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
}
