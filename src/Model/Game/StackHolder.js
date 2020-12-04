export default class StackHolder {
    constructor(stack) {
        this.stack = [...stack];
    }

    getTop() {
        return this.stack[this.stack.length - 1];
    }
}