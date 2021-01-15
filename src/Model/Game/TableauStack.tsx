import Card from "../Deck/Card";
import HandHoldingStack from "./HandHoldingStack";
import Model from "../Model";
import { getTableauOrder } from "../Deck/DeckSize";

export default class TableauStack extends HandHoldingStack {
    id = 0;
    accepts = (current: Card | null) => {
        const top = this.getTop();
        if (!top) {
            return (current && current.face === "K") || false;
        }
        if (this.source === current?.source) return true;
        if (top.isHidden) {
            return false;
        }
        const range = [...getTableauOrder()];
        const currentIndex = current ? range.indexOf(current.face) : 0;
        const topIndex = range.indexOf(top.face);
        return currentIndex + 1 === topIndex && current?.type.color !== top.type.color && top.face !== "A";
    };
    getTop = (offset?: number) => this.stack[this.stack.length - 1 - (offset || 0)];
    canUncover = (card: Card) => {
        const top = this.getTop();
        return top.isHidden && card && card.equals(this.getTop());
    };
    setOnClick = (onClick: (a: any, b: any) => (s: Model) => void, onClickhidden: (a: any, b: any) => (s: Model) => void) => {
        this.clickEmpty = (p: any) => onClick(null, p);
        const cards = this.source === this.hand.source ? [...this.stack, ...this.hand.stack] : this.stack;
        cards.forEach((card, sindex) => {
            const click = card.isHidden && sindex === cards.length - 1 ? onClickhidden : onClick;
            card.onClick = (p: any) => click({ ...card }, p);
            card.canClick = () => !card.isHidden || (this.canUncover(card) && !this.hand.currentCard()) || false;
        });
        this.hand.setOnClick(this);
    };
    static copy = (orig: TableauStack) => {
        const s = new TableauStack(orig.source, orig.hand);
        s.id = orig.id;
        s.stack = Card.copyAll(orig.stack);
        return s;
    };
}
