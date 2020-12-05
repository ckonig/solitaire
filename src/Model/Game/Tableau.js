import Card from "../Deck/Card";
import { getTableauOrder } from "../Deck/DeckSize";

export default class Tableau {
    constructor(cards) {
        this.stacks = new TableauGenerator().generateStacks(cards);
    }

    getStack = (index) => {
        return this.stacks[index];
    };

    accepts = (index, current) => {
        const top = this.getTop(index);
        const range = [...getTableauOrder()];
        const currentIndex = range.indexOf(current.face);
        const topIndex = range.indexOf(top.face);
        return currentIndex + 1 == topIndex && current.type.color != top.type.color;
    };

    popWithFollowing = (card, i) => {
        for (let j = 0; j < this.stacks[i].stack.length; j++) {
            if (card && Card.equals(this.stacks[i].stack[j], card)) {
                return this.stacks[i].stack.splice(j, this.stacks[i].stack.length);
            }
        }

        return [];
    };

    uncover = (index, card) => {
        const top = this.getTop(index);
        if (top.isHidden && Card.equals(card, this.getTop(index))) {
            top.isHidden = false;
            return true;
        }

        return false;
    };

    add = (index, cards) => {
        this.stacks[index].stack = this.stacks[index].stack.concat(cards.map((c) => this.setCardProperties(c, index)));
        //this.stacks[index].stack.push(cards.map((c) => this.setCardProperties(c, index))); //@todo investigate why this doesn't work
    };

    setCardProperties = (card, index) => {
        card.source = "tableau-" + index;
        return card;
    };

    getTop(index) {
        return this.stacks[index].stack[this.stacks[index].stack.length - 1];
    }
}

class TableauGenerator {
    generateStacks = (deck) => {
        this.deck = deck;
        this.pointer = 0;
        this.oldpointer = this.pointer;
        const ids = [0, 1, 2, 3, 4, 5, 6];
        this.stacks = ids.map((id) => this.template(id));
        ids.reverse().forEach((id) => {
            this.generateStack(id);
        });
        return this.stacks;
    };

    template = (id) => ({
        stack: [],
        id,
    });

    generateStack = (id) => {
        this.pointer += 6 - id + 1;
        this.stacks[id].stack = this.deck
            .slice(this.oldpointer, this.pointer)
            .map((c) => ({
                ...c,
                isHidden: true,
                source: "tableau-" + id,
            }))
            .reverse();
        if (this.stacks[id].stack[this.stacks[id].stack.length - 1]) {
            this.stacks[id].stack[this.stacks[id].stack.length - 1].isHidden = false;
        }
        this.oldpointer = this.pointer;
    };
}
