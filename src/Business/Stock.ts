import { BlinkFunction, ClickHandler } from "../Common";

import Blinker from "./Blinker";
import BusinessModel from "./BusinessModel";
import Card from "../Model/Deck/Card";
import Navigator from "./Navigator";

export default class Stock implements ClickHandler {
    navigator: Navigator;
    constructor(navigator: Navigator) {
        this.navigator = navigator;
    }

    blink: BlinkFunction = (state: BusinessModel) => new Blinker().startBlink((s: BusinessModel) => s.stock, state);

    dispatchPutDown = (_card: Card, _position: any, state: BusinessModel) => this.blink(state, 0);

    dispatchPickup = (card: Card, _position: any, state: BusinessModel) => {
        return card != null ? this.moveToWaste(card, state) : this.recycleWaste(card, state);
    };

    moveToWaste = (card: Card, state: BusinessModel) => {
        return state.stock.isOnTop(card) && state.waste.addAll(state.stock.popTop()) && state.game.registerMove("waste", "stock");
    };

    recycleWaste = (_card: Card, state: BusinessModel) => {
        if (!state.stock.getTop()) {
            return (
                (!!state.waste.getTop() &&
                    state.stock.canRecycle() &&
                    state.stock.recycle(state.waste.recycle()) &&
                    state.game.registerRecycle() &&
                    this.navigator.finishNav()) ||
                this.blink(state, 0)
            );
        }
    };
}
