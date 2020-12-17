import Card from "../Deck/Card";
import { getTableauOrder } from "../Deck/DeckSize";

export default class Tableau {
    constructor(settings) {
        const ids = [0, 1, 2, 3, 4, 5, 6];
        this.stacks = ids.map((id) => ({
            stack: [],
            id,
        }));
        this.settings = settings;
    }

    getStack = (index) => {
        return this.stacks[index];
    };

    wouldAccept = (index, hand) => this.canPutDown(this.getTop(index), hand, index);

    canPutDown = (card, hand, index) =>
        (card && card.isHidden && hand.isFromCurrentSource(card)) ||
        this.accepts(index, hand.currentCard()) ||
        (!card && hand.isFromTableau(index));

    accepts = (index, current) => {
        const top = this.getTop(index);
        if (!top) {
            return current && current.face === "K";
        }
        if (top.isHidden) {
            return false;
        }
        const range = [...getTableauOrder()];
        const currentIndex = range.indexOf(current.face);
        const topIndex = range.indexOf(top.face);
        return currentIndex + 1 == topIndex && current.type.color !== top.type.color && top.face !== "A";
    };

    getCard = (index, card) => {
        for (let j = 0; j < this.stacks[index].stack.length; j++) {
            if (card && card.equals(this.stacks[index].stack[j]) && card.isHidden === this.stacks[index].stack[j].isHidden) {
                return this.stacks[index].stack[j];
            }
        }
        return false;
    };

    popWithFollowing = (card, i) => {
        for (let j = 0; j < this.stacks[i].stack.length; j++) {
            if (card && card.equals(this.stacks[i].stack[j])) {
                const result = this.stacks[i].stack.splice(j, this.stacks[i].stack.length);
                this.stackEntropy(i);
                return result;
            }
        }

        return [];
    };

    uncover = (index, card) => {
        const top = this.getTop(index);
        if (top.isHidden && card && card.equals(this.getTop(index))) {
            top.isHidden = false;
            this.stackEntropy(index);
            return true;
        }

        return false;
    };

    stackEntropy = (index) => {
        let entropy = this.settings.interactionEntropy;
        let next = 1;
        let top = this.getTop(index);
        while (entropy && entropy != 0 && top) {
            top.causeEntropy(entropy);
            entropy--;
            top = this.getTop(index, next);
            next++;
        }
    };

    add = (index, cards) => {
        this.stacks[index].stack = this.stacks[index].stack.concat(cards.map((c) => this.setCardProperties(c, index)));
        this.stackEntropy(index);
        return cards;
    };

    setCardProperties = (card, index) => {
        card.source = "tableau-" + index;
        return card;
    };

    getTop = (index, offset) => {
        if (!offset) {
            offset = 0;
        }
        return this.stacks[index].stack[this.stacks[index].stack.length - 1 - offset];
    }

    static copy = (orig) => {
        const copy = new Tableau([], orig.settings);
        copy.stacks = orig.stacks.map((stack) => ({ stack: Card.copyAll(stack.stack) }));
        return copy;
    };

    setEntropy = (lvl) => {
        this.stacks.forEach((stack) => stack.stack.forEach((element) => element.causeEntropy(Math.min(lvl, 4))));
        return this;
    };
}
