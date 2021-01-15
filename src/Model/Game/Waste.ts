import Card from "../Deck/Card";
import Hand from "./Hand";
import HandHoldingStack from "./HandHoldingStack";
import Model from "../Model";
import Settings from "./Settings";

export default class Waste extends HandHoldingStack {
    settings: Settings;
    constructor(settings: Settings, hand: Hand) {
        super("waste", hand);
        this.settings = settings;
    }

    setOnClick = (onClick: (c: any, p: any, i: any) => (s: Model) => void) => {
        this.clickEmpty = (p) => onClick(null, p, null);
        const cards = this.source === this.hand.source ? [...this.stack, ...this.hand.stack] : this.stack;
        cards.forEach((card, index) => {
            card.onClick = (p: any) => onClick({ ...card }, p, null);
            card.canClick = () => index === cards.length - 1;
        });
        this.hand.setOnClick(this);
    };

    putDownHand = () => this.addAll(this.hand.putDown());

    add = (card: Card) => card && this.stack.push(this.setCardProperties(card));

    addAll = (cards: Card[]) => cards && cards.length && cards.map(this.add);

    setCardProperties = (card: Card) => {
        card.source = this.source;
        card.isHidden = false;
        card.causeEntropy(Math.min(this.settings.interactionEntropy, 1));
        return card;
    };

    wouldAcceptHand = () => this.hand.isFromWaste() && this.canAdd(this.hand.currentCard());

    accepts = (card: Card | null) => this.canAdd(card) || false;

    canAdd = (card: Card | null) => card && (!this.getTop() || !card.equals(this.getTop()));

    popTop = (card: Card) => (card && card.equals(this.getTop()) && this.stack.pop()) || null;

    recycle = () => this.stack.splice(0, this.stack.length);

    static copy = (orig: Waste, hand: Hand) => {
        const copy = new Waste(orig.settings, hand);
        copy.stack = Card.copyAll(orig.stack);
        return copy;
    };

    setEntropy = (lvl: number) => {
        this.stack.forEach((element) => element.causeEntropy(Math.min(lvl, 1)));
        return this;
    };
}
