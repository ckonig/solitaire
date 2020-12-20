import BasicStack from "./BasicStack";
import Card from "../Deck/Card";

export default class Waste extends BasicStack {
    constructor(settings) {
        super("waste");
        this.settings = settings;
        // eslint-disable-next-line no-unused-vars
        this.onClick = (_a, _b, _c) => {};
        this.blinkFor = 0;
        this.unblink = () => {};
    }

    tryPutDown = (card) => this.canAdd(card) && (this.add(card) || true);

    add = (card) => card && this.stack.push(this.setCardProperties(card));

    setClickability = (passthrough) => {
        this.stack.forEach(card => { card.canClick = false;})
        this.getTop() && (this.getTop().canClick = true);
        return passthrough;
    };

    addAll = (cards) => cards && cards.length && cards.map(this.add) && this.setClickability(1);

    setCardProperties = (card) => {
        card.source = this.source;
        card.isHidden = false;
        card.causeEntropy(Math.min(this.settings.interactionEntropy, 1));
        card.canClick = false;
        return card;
    };

    wouldAccept = (hand) => hand.isFromWaste() && this.canAdd(hand.currentCard());

    canAdd = (card) => card && (!this.getTop() || !card.equals(this.getTop()));

    popTop = (card) => card && card.equals(this.getTop()) && this.setClickability(this.stack.pop());

    recycle = () => this.stack.splice(0, this.stack.length);

    static copy = (orig) => {
        const copy = new Waste(orig.settings);
        copy.stack = Card.copyAll(orig.stack);
        return copy;
    };

    setEntropy = (lvl) => {
        this.stack.forEach((element) => element.causeEntropy(Math.min(lvl, 1)));
        return this;
    };
}
