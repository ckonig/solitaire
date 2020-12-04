import Tableau from "./Tableau";

class TableauGenerator {
    getStacks = (deck) => {
        this.deck = deck;
        this.pointer = 0;
        this.oldpointer = this.pointer;
        const ids = [0, 1, 2, 3, 4, 5, 6];
        this.stacks = ids.map((id) => this.getStack(id));
        ids.reverse().forEach((id) => {
            this.generateStack(id);
        });
        return this.stacks;
    };

    generateStack = (id) => {
        this.pointer += 6 - id + 1;
        this.stacks[id].stack = this.deck
            .slice(this.oldpointer, this.pointer)
            .map((c) => {
                c.isHidden = true;
                c.source = "tableau-" + id;
                return c;
            })
            .reverse();
        if (this.stacks[id].stack[this.stacks[id].stack.length - 1]) {
            this.stacks[id].stack[this.stacks[id].stack.length - 1].isHidden = false;
        }
        this.oldpointer = this.pointer;
    };

    getRndInteger = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
    };

    getStack = (id) => {
        const template = { stack: [], id };
        //@todo add functionality
        return { ...template };
    };
}

export default function generateTableau(cards) {
    return new Tableau(new TableauGenerator().getStacks(cards));
}
