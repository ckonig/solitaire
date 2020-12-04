import CardTools from "../Deck/CardTools";
import StackHolder from "./StackHolder";

export default class Waste extends StackHolder {
    constructor() {
        super([]);
    }

    tryPutDown(card) {
        return this.canAdd(card) && (this.add(card) || true);
    }

    add(card) {
        if (card) {
            card.source = "waste";
            card.isHidden = false;
            this.stack.push(card);
            return true;
        }
    }

    canAdd(card) {
        const top = this.getTop();
        return card && (!top || CardTools.cardNotEquals(card, top));
    }

    popTop(card) {
        if (CardTools.cardEquals(card, this.getTop())) {
            return this.stack.pop();
        }
    }

    recycle() {
        const ret = [...this.stack];
        this.stack = [];
        return ret;
    }
}
