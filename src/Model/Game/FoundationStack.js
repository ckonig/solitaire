import { getTargetOrder } from "../Deck/CardRange";

export default class FoundationStack {
    constructor(icon, color) {
        this.stack = [];
        this.acceptedCards = [...getTargetOrder()];
        this.usedCards = [];
        this.icon = icon;
        this.color = color;
    }

}