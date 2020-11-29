export default class TableauGenerator {

    getStacks = (deck) => {
        this.deck = deck;
        this.pointer = 0;
        this.oldpointer = this.pointer;
        var ids = [0, 1, 2, 3, 4, 5, 6];
        this.stacks = ids.map(id => this._getStack(id));
        ids.reverse().forEach(id => {
            this._generateStack(id);
        })
        return this.stacks;
    }

    _generateStack = (id) => {
        this.pointer += 6-id + 1;
        this.stacks[id].stack = this.deck.slice(this.oldpointer, this.pointer).reverse();
        if (this.stacks[id].stack[this.stacks[id].stack.length - 1]) {
            this.stacks[id].stack[this.stacks[id].stack.length - 1].hidden = false;
        }
        this.oldpointer = this.pointer;
    }

    _getRndInteger = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    _getStack = (id) => {
        var template = { stack: [], id };
        return { ...template };
    }
}