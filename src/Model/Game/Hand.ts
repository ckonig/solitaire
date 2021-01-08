import Card from "../Deck/Card";
import { IStack } from "./IStack";
import { XY } from "../../View/UI/XY";

export default class Hand {
    stack: Card[];
    source: string;
    position: XY | null;
    constructor() {
        this.stack = [];
        this.source = "";
        this.position = null;
    }

    pickUp = (stack: Card[], source: string, position: XY) => {
        if (stack && stack[0]) {
            this.stack = stack.map((c) => {
                c.suggestion = false;
                return c;
            });
            this.source = source;
            this.position = position;
        }

        return stack;
    };

    putDown = () => {
        this.source = "";
        const result = this.stack.splice(0, this.stack.length);
        return result;
    };

    setOnClick = (model: IStack) => {
        if (this.source && this.source == model.source) {
            let _onClick = model.clickEmpty;
            if (model.stack.length) {
                _onClick = model.stack[model.stack.length - 1].onClick;
            }
            this.stack.forEach((card) => {
                card.onClick = _onClick;
                card.canClick = () => true;
            });
        }
    };

    isHoldingCard = () => !!this.stack.length;

    isHoldingKing = () => this.isHoldingCard() && this.currentCard() && this.currentCard()?.face == "K";

    currentCard: () => Card | null = () => (this.isHoldingCard() && this.stack[0]) || null;

    hasMoreThanOneCard = () => this.stack.length > 1;

    isFromCurrentSource = (card: Card) => (this.source && card.source == this.source) || null;

    isFromWaste = () => this.source && this.source == "waste";

    isFromFoundation = (index: number) => this.source && this.source == `foundation-${index}`;

    isFromTableau = (index: number) => this.source && this.source == `tableau-${index}`;

    isFromAnyTableau = () => this.source && this.source.substring(0, 8) == "tableau-";

    getTableauIndex: () => number = () => (this.source && parseInt(this.source.substring(8))) || 0;

    static copy = (orig: Hand) => {
        const copy = new Hand();
        copy.stack = Card.copyAll(orig.stack);
        copy.source = orig.source;
        copy.position = orig.position;
        return copy;
    };
}
