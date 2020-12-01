import CardTools from "../Deck/CardTools";

export default class Tableau {
    constructor(stacks) {
        this.stacks = stacks;
    }

    getStack(index) {
        return this.stacks[index];
    }

    findFollowing(card) {
        for (var i = 0; i < this.stacks.length; i++) {
            for (var j = 0; j < this.stacks[i].stack.length; j++) {
                if (card.props && this.stacks[i].stack[j].face == card.props.face && this.stacks[i].stack[j].type.icon == card.props.type.icon) {
                    return this.stacks[i].stack.splice(j + 1, this.stacks[i].stack.length - 1).map(f => { return { props: f } })
                }
            }
        }

        return [];
    }

    filterOut = (card) => {
        return CardTools.filterOut(this.stacks, card);
    }

    uncover(index, card) {
        for (var i = 0; i < this.stacks[index].stack.length; i++) {
            if (CardTools.cardEquals(this.stacks[index].stack[i], card.props) && this.stacks[index].stack[i].hidden) {
                this.stacks[index].stack[i].hidden = false;
                return true;
            }
        }

        return false;
    }
}