import Card from "../Deck/Card";
import Hand from "./Hand";
import HandHoldingStack from "./HandHoldingStack";
import Model from "../Model";
import { Suit } from "../Deck/Suits";
import { getFoundationOrder } from "../Deck/DeckSize";

export default class FoundationStack extends HandHoldingStack {
    constructor(source: string, hand: Hand, suit: Suit) {
        super(source, hand);
        this.acceptedCards = [...getFoundationOrder()];
        this.usedCards = [];
        this.icon = suit.icon;
        this.color = suit.color;
        this.name = suit.name;
    }
    acceptedCards: string[] = [];
    usedCards: any[] = [];
    icon = "";
    name = "";
    color = "";
    getCurrentAccepted = () => {
        return this.acceptedCards[this.acceptedCards.length - 1];
    };
    accepts = (card: Card | null) => {
        if (!card) return false;
        const currentAccepted = this.getCurrentAccepted();
        return this.icon === card.type.icon && currentAccepted === card.denomination;
    };
    setOnClick = (onClick: (c: any, p: any) => (s: Model) => void, hand: Hand) => {
        this.clickEmpty = (p) => onClick(null, p);
        const cards = this.source === hand.source ? [...this.stack, ...hand.stack] : this.stack;
        cards.forEach((card, sindex) => {
            card.onClick = (p: any) => onClick({ ...card }, p);
            card.canClick = () => sindex === cards.length - 1;
        });
        this.hand.setOnClick(this);
    };
}
