import BusinessModel from "./BusinessModel";
import Card from "../Model/Deck/Card";
import { ClickHandler } from "../Common";
import Hand from "../Model/Game/Hand";

export default class Dispatcher {
    clickHandler: ClickHandler;

    constructor(clickHandler: ClickHandler) {
        this.clickHandler = clickHandler;
    }

    getHandler = (hand: Hand) => {
        if (hand && hand.isHoldingCard()) {
            return this.dispatchPutDown;
        } else {
            return this.dispatchPickup;
        }
    };

    dispatchPutDown = (card: Card, position: any, index: number) => (state: BusinessModel) => {
        if (state.hand.isHoldingCard()) {
            this.clickHandler.dispatchPutDown(card, position, state, index);
        }
    };

    dispatchPickup = (card: Card, position: any, index: number) => (state: BusinessModel) => {
        if (!state.hand.isHoldingCard()) {
            this.clickHandler.dispatchPickup(card, position, state, index);
        }
    };
}
