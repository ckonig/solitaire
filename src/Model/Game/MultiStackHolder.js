export default class MultiStackHolder {
    constructor(stacks) {
        this.stacks = stacks;
    }

    getTop(index) {
        return this.stacks[index].stack[this.stacks[index].stack.length - 1];
    }
}