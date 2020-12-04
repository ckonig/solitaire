import CardTools from "../Deck/CardTools";
import MultiStackHolder from "./MultiStackHolder";

export default class Foundation extends MultiStackHolder {
    filterOut = (card) => {
        this.stacks = CardTools.filterOut(this.stacks, card);
    };

    getCurrentAccepted = (index) => {
         const currentFoundation = this.stacks[index].acceptedCards;
        return currentFoundation[currentFoundation.length - 1];
    };

    accepts = (index, card) => {
        const currentAccepted = this.getCurrentAccepted(index);
        return this.stacks[index].icon == card.type.icon && currentAccepted == card.face;
    };

    contains = (index, card) => {
        return this.stacks[index].stack.indexOf(card) !== -1;
    };

    add = (index, card) => {
        card.source = "foundation-" + index;
        this.stacks[index].stack.push(card);
        this.stacks[index].usedCards.push(this.stacks[index].acceptedCards.pop());
    };

    remove = (index, card) => {
        this.filterOut(card);
        this.stacks[index].acceptedCards.push(this.stacks[index].usedCards.pop());
    };

    getPreviousUsed = (index) => {
        return [...this.stacks[index].usedCards].pop();
    };

    countCards = () => {
        this.stacks.map((f) => parseInt(f.stack.length)).reduce((a, b) => a + b, 0);
    }
}
