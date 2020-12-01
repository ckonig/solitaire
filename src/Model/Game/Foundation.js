import CardTools from "../Deck/CardTools";

export default class Foundation {
    constructor(stacks) {
        this.stacks = stacks;
    }

    filterOut(card) {
        this.stacks = CardTools.filterOut(this.stacks, card);
    }

    getCurrentAccepted(index) {
        var currentFoundation = this.stacks[index].acceptedCards;
        return currentFoundation[currentFoundation.length - 1];
    }

    accepts(index, card) {
        var currentAccepted = this.getCurrentAccepted(index);
        return this.stacks[index].icon == card.props.type.icon && currentAccepted == card.props.face
    }

    contains(index, card) {
        return this.stacks[index].stack.indexOf(card) !== -1
    }
}