export default class BasicStack {
    source = null;
    stack = [];
    getTop = () => this.stack && this.stack.length && this.stack[this.stack.length - 1];
}
