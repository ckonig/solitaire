import Card from "../Deck/Card";

export default class Waste {
    constructor() {
        this.stack = [];
    }

    tryPutDown = (card) => this.canAdd(card) && (this.add(card) || true);

    add = (card) => card && this.stack.push(this.setCardProperties(card));

    setCardProperties = (card) => {
        card.source = "waste";
        card.isHidden = false;
        card.causeEntropy(1);
        return card;
    };

    canAdd = (card) => card && (!this.getTop() || !card.equals(this.getTop()));

    popTop = (card) => card && card.equals(this.getTop()) && this.stack.pop();

    recycle = () => this.stack.splice(0, this.stack.length);

    getTop = () => this.stack[this.stack.length - 1];

    static copy = (orig) => {
        const copy = new Waste();
        copy.stack = Card.copyAll(orig.stack);
        return copy;
    }

    setEntropy = (lvl) => {
        this.stack.forEach(element => element.causeEntropy(Math.min(lvl,1)));
        return this;
    }
}
