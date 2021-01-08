import { BlinkFunction, ClickHandler } from "../../Common";

import Blinker from "./Blinker";
import Card from "../Deck/Card";
import Model from "../Model";
import Navigator from "./Navigator";

export default class Stock implements ClickHandler {
    navigator: Navigator;
    constructor(navigator: Navigator) {
        this.navigator = navigator;
    }

    blink: BlinkFunction = (state: Model) => new Blinker().startBlink((s: Model) => s.stock, state);

    dispatchPutDown = (_card: Card, _position: any, state: Model) => this.blink(state, 0);

    dispatchPickup = (card: Card | null, _position: any, state: Model) => {
        return card != null ? this.moveToWaste(card, state) : this.recycleWaste(state);
    };

    moveToWaste = (card: Card, state: Model) => {
        return state.stock.isOnTop(card) && state.waste.addAll(state.stock.popTop()) && state.game.registerMove("waste", "stock");
    };

    recycleWaste = (state: Model) => {
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
