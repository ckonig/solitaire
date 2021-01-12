import Card from "../Deck/Card";
import { IStack } from "./IStack";
import Model from "../Model";

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
    onClick = (a: any) => (s: any) => {};
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    clickEmpty = (a: any) => (s: any) => {};
    unblink: (model: Model) => void = () => {};
    abstract accepts: (card: Card | null) => boolean;
}
export default BasicStack;
