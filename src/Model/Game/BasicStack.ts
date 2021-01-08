import Card from "../Deck/Card";

export default class BasicStack {
    source: string;
    constructor(source: string) {
        this.source = source;
    }
    stack: Card[] = [];
    getTop: () => Card | null = () => (this.stack && this.stack.length && this.stack[this.stack.length - 1]) || null;
    suggestion = false;
    getClickable = () => this.stack.filter((card) => card.canClick());
}
