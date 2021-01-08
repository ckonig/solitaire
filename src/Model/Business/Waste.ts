import { BlinkFunction, ClickHandler } from "../../Common";

import Blinker from "./Blinker";
import Card from "../Deck/Card";
import Model from "../Model";

export default class Waste implements ClickHandler {
    blink: BlinkFunction = (state: Model) => new Blinker().startBlink((s: Model) => s.waste, state);

    dispatchPutDown = (card: Card, position: any, state: Model) =>
        (state.waste.wouldAcceptHand() && state.waste.putDownHand() && state.game.registerMove("waste", "waste")) || this.blink(state, 0);

    dispatchPickup = (card: Card | null, position: any, state: Model) =>
        (card && state.hand.pickUp([state.waste.popTop(card)], "waste", position) && state.game.registerPickup()) || this.blink(state, 0);
}
