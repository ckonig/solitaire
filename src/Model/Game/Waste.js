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
        return card;
    };

    canAdd = (card) => card && (!this.getTop() || Card.notEquals(card, this.getTop()));

    popTop = (card) => Card.equals(card, this.getTop()) && this.stack.pop();

    recycle = () => this.stack.splice(0, this.stack.length);

    getTop = () => this.stack[this.stack.length - 1];
}
