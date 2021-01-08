export default class BasicStack {
    constructor(source) {
        this.source = source;
    }
    stack = [];
    getTop = () => this.stack && this.stack.length && this.stack[this.stack.length - 1];
    suggestion = false;
    getClickable = () => this.stack.filter((card) => card.canClick());
}
