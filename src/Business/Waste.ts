import { BlinkFunction, ClickHandler } from "../Common";

import Blinker from "./Blinker";
import BusinessModel from "./BusinessModel";
import Card from "../Model/Deck/Card";

export default class Waste implements ClickHandler {
    blink: BlinkFunction = (state: BusinessModel) => new Blinker().startBlink((s: BusinessModel) => s.waste, state);

    dispatchPutDown = (card: Card, position: any, state: BusinessModel) =>
        (state.waste.wouldAcceptHand() &&
            state.waste.putDownHand() &&
            state.game.registerMove("waste", "waste")) ||
        this.blink(state, 0);

    dispatchPickup = (card: Card, position: any, state: BusinessModel) =>
        (card && state.hand.pickUp([state.waste.popTop(card)], "waste", position) && state.game.registerPickup()) || this.blink(state, 0);
}
