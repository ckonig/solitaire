import Card from "../Deck/Card";
import { getTableauOrder } from "../Deck/DeckSize";

export default class Tableau {
    constructor(cards, settings) {
        this.stacks = !cards ? [] : new TableauGenerator().generateStacks(cards);
        this.settings = settings;
    }

    getStack = (index) => {
        return this.stacks[index];
    };

    accepts = (index, current) => {
        const top = this.getTop(index);
        if (!top) {
            return current && current.face == "K";
        }
        if (top.isHidden) {
            return false;
        }
        const range = [...getTableauOrder()];
        const currentIndex = range.indexOf(current.face);
        const topIndex = range.indexOf(top.face);
        return currentIndex + 1 == topIndex && current.type.color != top.type.color;
    };

    popWithFollowing = (card, i) => {
        for (let j = 0; j < this.stacks[i].stack.length; j++) {
            if (card && card.equals(this.stacks[i].stack[j])) {
                //@todo also entropy to next card
                return this.stacks[i].stack.splice(j, this.stacks[i].stack.length);
            }
        }

        return [];
    };

    uncover = (index, card) => {
        const top = this.getTop(index);
        if (top.isHidden && card && card.equals(this.getTop(index))) {
            top.isHidden = false;
            //@todo also entropy to next card
            top.causeEntropy(this.settings.entropyLevel);
            return true;
        }

        return false;
    };

    add = (index, cards) => {
        this.getTop(index) && this.getTop(index).causeEntropy(this.settings.entropyLevel);
        this.stacks[index].stack = this.stacks[index].stack.concat(cards.map((c) => this.setCardProperties(c, index)));
        return cards;
    };

    setCardProperties = (card, index) => {
        card.source = "tableau-" + index;
        card.causeEntropy(this.settings.entropyLevel);
        return card;
    };

    getTop(index) {
        return this.stacks[index].stack[this.stacks[index].stack.length - 1];
    }

    static copy = (orig) => {
        const copy = new Tableau([]);
        copy.stacks = orig.stacks.map(stack => ({stack: Card.copyAll(stack.stack)}));
        return copy;
    }

    setEntropy = (lvl) => {
        this.stacks.forEach((stack) => stack.stack.forEach((element) => element.causeEntropy(Math.min(lvl, 4))));
        return this;
    };
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
