import Card from "../Deck/Card";
import Model from "../Model";

export interface IStack {
    source: string;
    stack: Card[];
    getTop: () => Card | null;
    getClickable: () => Card[];
    clickEmpty: (p: any) => (s: Model) => void;
    blinkFor: number;
    unblink: (model: Model) => void;
    suggestion: boolean;
    accepts: (card: Card | null) => boolean;
}

abstract class BasicStack implements IStack {
    source: string;
    constructor(source: string) {
        this.source = source;
    }
    suggestion = false;
    stack: Card[] = [];
    getTop: () => Card | null = () => (this.stack && this.stack.length && this.stack[this.stack.length - 1]) || null;
    getClickable = () => this.stack.filter((card) => card.canClick());
    blinkFor = 0;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onClick = (a: any) => (s: Model) => {};
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    clickEmpty = (a: any) => (s: Model) => {};
    unblink: (model: Model) => void = () => {};
    abstract accepts: (card: Card | null) => boolean;
}
export default BasicStack;
