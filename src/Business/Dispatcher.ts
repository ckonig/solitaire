import BusinessModel from "./BusinessModel";
import Card from "../Model/Deck/Card";
import { ClickHandler } from "../Common";
import Hand from "../Model/Game/Hand";
import Suggestions from "./Suggestions";

export default class Dispatcher {
    clickHandler: ClickHandler;
    suggestor: Suggestions;

    constructor(clickHandler: ClickHandler, suggestor: Suggestions) {
        this.clickHandler = clickHandler;
        this.suggestor = suggestor;
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
            this.suggestor.clearSuggestionsIfNecessary(state);
            this.clickHandler.dispatchPutDown(card, position, state, index);
        }
    };

    dispatchPickup = (card: Card, position: any, index: number) => (state: BusinessModel) => {
        if (!state.hand.isHoldingCard()) {
            this.suggestor.clearSuggestionsIfNecessary(state);
            this.clickHandler.dispatchPickup(card, position, state, index);
        }
    };
}
