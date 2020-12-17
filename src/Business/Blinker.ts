import BusinessModel from "./BusinessModel";
import { StateUpdateFunction } from "../Common";
import Stock from "../Model/Game/Stock";
import Waste from "../Model/Game/Waste";

//@todo specify types of single tableau and foundation to avoid any

export type BlinkSelector = (state: BusinessModel) => Waste | Stock | any;

export default class Blinker {
    updateGameContext: StateUpdateFunction;

    constructor(updateGameContext: StateUpdateFunction) {
        this.updateGameContext = updateGameContext;
    }

    startBlink = (selector: BlinkSelector, state: BusinessModel) => {
        selector(state).blinkFor = 10;
        state.game.registerBlink();
        selector(state).unblink = () => this.stopBlink(selector);
    };

    stopBlink = (selector: BlinkSelector) =>
        this.updateGameContext((state) => {
            selector(state).blinkFor = 0;
            state.game.registerBlink();
        });
}
