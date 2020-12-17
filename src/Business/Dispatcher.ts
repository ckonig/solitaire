import { ClickHandler, StateUpdateFunction } from "../Common";

import Card from "../Model/Deck/Card";
import Hand from "../Model/Game/Hand";

export default class Dispatcher {
    clickHandler: ClickHandler;
    updateGameContext: StateUpdateFunction;

    constructor(clickHandler: ClickHandler, updateGameContext: StateUpdateFunction) {
        this.clickHandler = clickHandler;
        this.updateGameContext = updateGameContext;
    }

    getHandler = (hand: Hand) => {
        if (hand && hand.isHoldingCard()) {
            return this.dispatchPutDown;
        } else {
            return this.dispatchPickup;
        }
    };

    dispatchPutDown = (card: Card, position: any, index: number) => {
        this.updateGameContext((state) => {
            if (state.hand.isHoldingCard()) {
                this.clickHandler.dispatchPutDown(card, position, state, index);
            }
        });
    };

    dispatchPickup = (card: Card, position: any, index: number) => {
        this.updateGameContext((state) => {
            if (!state.hand.isHoldingCard()) {
                this.clickHandler.dispatchPickup(card, position, state, index);
            }
        });
    };
}
