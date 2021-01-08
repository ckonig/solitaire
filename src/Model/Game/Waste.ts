import Card from "../Deck/Card";
import Hand from "./Hand";
import HandHoldingStack from "./HandHoldingStack";
import Settings from "./Settings";
import { XY } from "../../View/UI/XY";

export default class Waste extends HandHoldingStack {
    settings: Settings;
    blinkFor: number;
    unblink: () => void;
    clickEmpty: (p: any) => void;
    constructor(settings: Settings, hand: Hand) {
        super("waste", hand);
        this.settings = settings;
        // eslint-disable-next-line no-unused-vars
        this.blinkFor = 0;
        this.unblink = () => {};
        this.clickEmpty = () => {};
    }

    setOnClick = (onClick: (c: any, p: XY, i: any) => void) => {
        this.clickEmpty = (p) => onClick(null, p, null);
        this.stack.forEach((card, index) => {
            card.onClick = (p: XY) => onClick({ ...card }, p, null);
            card.canClick = () => index == this.stack.length - 1;
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

    canAdd = (card: Card) => card && (!this.getTop() || !card.equals(this.getTop()));

    popTop = (card: Card) => card && card.equals(this.getTop()) && this.stack.pop();

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
