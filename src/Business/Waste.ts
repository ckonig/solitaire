import { BlinkFunction, ClickHandler } from "../Common";

import Blinker from "./Blinker";
import BusinessModel from "./BusinessModel";
import Card from "../Model/Deck/Card";

export default class Waste implements ClickHandler {
    blink: BlinkFunction;

    constructor(blinker: Blinker) {
        this.blink = (state: BusinessModel) => blinker.startBlink((s: BusinessModel) => s.waste, state);
    }

    dispatchPutDown = (card: Card, position: any, state: BusinessModel) =>
        (state.waste.wouldAccept(state.hand) &&
            state.waste.tryPutDown(state.hand.currentCard()) &&
            state.hand.putDown() &&
            state.game.registerMove("waste", "waste")) ||
        this.blink(state, 0);

    dispatchPickup = (card: Card, position: any, state: BusinessModel) =>
        (card && state.hand.pickUp([state.waste.popTop(card)], "waste", position) && state.game.registerPickup()) || this.blink(state, 0);
}
