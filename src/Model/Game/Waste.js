import Card from "../Deck/Card";
import { HandHoldingStack } from "./BasicStack";

export default class Waste extends HandHoldingStack {
    constructor(settings, hand) {
        super("waste", hand);
        this.settings = settings;
        // eslint-disable-next-line no-unused-vars
        this.blinkFor = 0;
        this.unblink = () => {};
    }

    setOnClick = (onClick) => {
        this.clickEmpty = (p) => onClick(null, p);
        this.stack.forEach((card, index) => {
            card.onClick = (p) => onClick({...card}, p);
            card.canClick = () => index == this.stack.length-1;
        });
        this.hand.setOnClick(this);  
    };

    putDownHand = () => this.addAll(this.hand.putDown());

    add = (card) => card && this.stack.push(this.setCardProperties(card));

    addAll = (cards) => cards && cards.length && cards.map(this.add);

    setCardProperties = (card) => {
        card.source = this.source;
        card.isHidden = false;
        card.causeEntropy(Math.min(this.settings.interactionEntropy, 1));
        return card;
    };

    wouldAcceptHand = () => this.hand.isFromWaste() && this.canAdd(this.hand.currentCard());

    canAdd = (card) => card && (!this.getTop() || !card.equals(this.getTop()));

    popTop = (card) => card && card.equals(this.getTop()) && this.stack.pop();

    recycle = () => this.stack.splice(0, this.stack.length);

    static copy = (orig, hand) => {
        const copy = new Waste(orig.settings, hand);
        copy.stack = Card.copyAll(orig.stack);
        return copy;
    };

    setEntropy = (lvl) => {
        this.stack.forEach((element) => element.causeEntropy(Math.min(lvl, 1)));
        return this;
    };
}
