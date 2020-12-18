import { BlinkFunction, ClickHandler } from "../Common";

import BusinessModel from "./BusinessModel";
import Card from "../Model/Deck/Card";
import { IBlinker } from "./Blinker";

export default class Stock implements ClickHandler {
    blink: BlinkFunction;

    constructor(blinker: IBlinker) {
        this.blink = (state: BusinessModel) => blinker.startBlink((s: BusinessModel) => s.stock, state);
    }

    dispatchPutDown = (card: Card, position: any, state: BusinessModel) => this.blink(state, 0);

    dispatchPickup = (card: Card, position: any, state: BusinessModel) =>
        card != null ? this.moveToWaste(card, state) : this.recycleWaste(card, state);

    moveToWaste = (card: Card, state: BusinessModel) =>
        state.stock.isOnTop(card) && state.waste.addAll(state.stock.popTop()) && state.game.registerMove("waste", "stock");

    recycleWaste = (_card: Card, state: BusinessModel) =>
        (!state.stock.getTop() &&
            !!state.waste.getTop() &&
            state.stock.canRecycle() &&
            state.stock.recycle(state.waste.recycle()) &&
            state.game.registerRecycle()) ||
        this.blink(state, 0);
}
