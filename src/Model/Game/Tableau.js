import { CardRange } from "../Deck/CardRange";
import CardTools from "../Deck/CardTools";
import MultiStackHolder from "./MultiStackHolder";

export default class Tableau extends MultiStackHolder {
    getStack = (index) => {
        return this.stacks[index];
    };

    accepts = (index, current) => {
        const top = this.getTop(index);
        const range = [...CardRange];
        const currentIndex = range.indexOf(current.face);
        const topIndex = range.indexOf(top.face);
        return currentIndex + 1 == topIndex && current.type.color != top.type.color;
    };

    popWithFollowing = (card, i) => {
        for (let j = 0; j < this.stacks[i].stack.length; j++) {
            if (card && CardTools.cardEquals(this.stacks[i].stack[j], card)) {
                return this.stacks[i].stack.splice(j, this.stacks[i].stack.length);
            }
        }

        return [];
    };

    uncover = (index, card) => {
        const top = this.getTop(index);
        if (top.isHidden && CardTools.cardEquals(card, this.getTop(index))) {
            top.isHidden = false;
            return true;
        }

        return false;
    };

    add = (index, cards) => {
        //@todo unify allocation of source
        const mapper = (c) => {
            c.source = "tableau-" + index;
            return c;
        };
        this.stacks[index].stack = this.stacks[index].stack.concat(cards.map(mapper));
    };
}
