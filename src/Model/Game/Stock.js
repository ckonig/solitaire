import CardTools from "../Deck/CardTools";
import StackHolder from "./StackHolder";

export default class Stock extends StackHolder {
    recycle(waste) {
        if (waste.length) {
            this.stack = [...waste].reverse().map((element) => {
                return { ...element, isHidden: true };
            });
            return true;
        }

        return false;
    }

    isOnTop(card) {
        return CardTools.cardEquals(card, this.getTop());
    }
}
