import CardTools from "../Deck/CardTools";

export default class Tableau {
    constructor(stacks) {
        this.stacks = stacks;
    }

    getStack(index) {
        return this.stacks[index];
    }

    findFollowing(card, i) {
        for (var j = 0; j < this.stacks[i].stack.length; j++) {
            if (card && CardTools.cardEquals(this.stacks[i].stack[j], card)) {
                return this.stacks[i].stack.slice(j + 1, this.stacks[i].stack.length)
            }
        }
        
        return [];
    }

    popWithFollowing(card, i) {
        for (var j = 0; j < this.stacks[i].stack.length; j++) {
            if (card && CardTools.cardEquals(this.stacks[i].stack[j], card)) {
                return this.stacks[i].stack.splice(j, this.stacks[i].stack.length)
            }
        }
        
        return [];
    }

    filterOut = (cards) => {
        return cards.map(card => CardTools.filterOut(this.stacks, card))
    }

    uncover(index, card) {
        for (var i = 0; i < this.stacks[index].stack.length; i++) {
            if (CardTools.cardEquals(this.stacks[index].stack[i], card) && this.stacks[index].stack[i].isHidden) {
                this.stacks[index].stack[i].isHidden = false;
                return true;
            }
        }

        return false;
    }

    add(index, card) {
        if (Array.isArray(card)) {
            card = card.map(c => { c.source = 'tableau-' + index; return c; });
            this.stacks[index].stack = this.stacks[index].stack.concat(card);
        } else {
            card.source = 'tableau-' + index
            this.stacks[index].stack.push(card);
        }
    }
}