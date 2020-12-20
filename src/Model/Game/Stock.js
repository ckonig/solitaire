import BasicStack from "./BasicStack";
import Card from "../Deck/Card";

export default class Stock extends BasicStack {
    constructor(stack, settings, focus) {
        super("stock");
        this.settings = settings;
        this.focus = focus;
        this.stack = stack.map(this.setCardProperties);
        this.setClickability();
        this.recyclings = 0;
        this.passes = -1;
        // eslint-disable-next-line no-unused-vars
        this.onClick = (a, b, c) => {};
        this.blinkFor = 0;
        this.unblink = () => {};
        if (this.settings.launchSettings.recyclingMode == "1-pass") {
            this.passes = 1;
        }
        if (this.settings.launchSettings.recyclingMode == "3-pass") {
            this.passes = 3;
        }
    }

    setClickability = () => {
        if (this.getTop()) {
            this.getTop().canClick = true;
        }
        return true;
    };

    popOne = () => {
        const result = this.stack.pop();
        this.setClickability();
        return result;
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
            this.setClickability();
            this.recyclings++;
            this.focus.setCard(this.getTop());
            return true;
        }

        return false;
    };

    setCardProperties = (card) => {
        card.causeEntropy(Math.min(this.settings.interactionEntropy, 1));
        card.isHidden = true;
        card.source = this.source;
        card.canClick = false;
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
        if (this.stack.length) {
            this.focus.setCard(this.getTop());
        } else {
            this.focus.setStack("stock");
        }

        this.setClickability();

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
