import BasicStack from "./Stack";
import Card from "../Deck/Card";
import Settings from "./Settings";

export default class Stock extends BasicStack {
    settings: Settings;
    recyclings: number;
    passes: number;
    constructor(stack: Card[], settings: Settings) {
        super("stock");
        this.settings = settings;
        this.stack = stack.map(this.setCardProperties);
        this.recyclings = 0;
        this.passes = -1;
        if (this.settings.launchSettings.recyclingMode === "1-pass") {
            this.passes = 1;
        }
        if (this.settings.launchSettings.recyclingMode === "3-pass") {
            this.passes = 3;
        }
    }

    setOnClick = (onClick: (c: any, p: any, i: any) => (s: any) => void) => {
        this.clickEmpty = (p) => onClick(null, p, null);
        this.stack.forEach((card, index) => {
            card.onClick = (p: any) => onClick({ ...card }, p, null);
            card.canClick = () => index === this.stack.length - 1;
        });
    };
    accepts = () => false;

    popOne = () => {
        const result = this.stack.pop();
        return result;
    };

    canRecycle() {
        return (
            this.settings.launchSettings.recyclingMode === "infinite" ||
            (this.settings.launchSettings.recyclingMode === "3-pass" && this.recyclings < 2)
        );
    }

    recycle = (waste: Card[]) => {
        if (waste.length) {
            this.stack = waste.reverse().map(this.setCardProperties);
            this.stack[this.stack.length - 1].canClick = () => true;
            this.recyclings++;
            return true;
        }

        return false;
    };

    setCardProperties = (card: Card) => {
        card.causeEntropy(Math.min(this.settings.interactionEntropy, 1));
        card.isHidden = true;
        card.source = this.source;
        return card;
    };

    isOnTop = (card: Card) => card && card.equals(this.getTop());

    popTop = () => {
        let result: Card[] = [];
        if (this.settings.launchSettings.drawMode === "single") {
            const top = this.stack.pop();
            if (top) result = [top];
        }
        if (this.settings.launchSettings.drawMode === "triple") {
            result = this.stack.splice(this.stack.length - 3);
        }
        if (this.stack.length === 0) {
            this.passes--;
        }

        return result;
    };

    static copy = (orig: Stock) => {
        const copy = new Stock([], orig.settings);
        copy.stack = Card.copyAll(orig.stack);
        copy.passes = orig.passes;
        copy.recyclings = orig.recyclings;
        return copy;
    };

    setEntropy = (lvl: number) => {
        this.stack.forEach((element) => element.causeEntropy(Math.min(lvl, 1)));
        return this;
    };
}
