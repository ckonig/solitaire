import BusinessModel from "./BusinessModel";
import Stock from "../Model/Game/Stock";
import Waste from "../Model/Game/Waste";

//@todo specify types of single tableau and foundation to avoid any

export type BlinkSelector = (state: BusinessModel) => Waste | Stock | any;

export interface IBlinker {
    startBlink: (selector: BlinkSelector, state: BusinessModel) => void;
}

export default class Blinker implements IBlinker {
    startBlink = (selector: BlinkSelector, state: BusinessModel) => {
        selector(state).blinkFor = 10;
        state.game.registerBlink();
        selector(state).unblink = (s: BusinessModel) => this.stopBlink(selector, s);
    };

    stopBlink = (selector: BlinkSelector, state: BusinessModel) => {
        selector(state).blinkFor = 0;
        state.game.registerBlink();
    };
}
