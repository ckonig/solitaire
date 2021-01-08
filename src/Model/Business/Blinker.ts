import Model from "../Model";
import Stock from "../Game/Stock";
import Waste from "../Game/Waste";

export type BlinkSelector = (state: Model) => Waste | Stock | any;

export interface IBlinker {
    startBlink: (selector: BlinkSelector, state: Model) => void;
}

export default class Blinker implements IBlinker {
    startBlink = (selector: BlinkSelector, state: Model) => {
        if (selector(state).blinkFor < 10) {
            selector(state).blinkFor = 10;
            state.game.registerBlink(true);
            selector(state).unblink = (s: Model) => this.stopBlink(selector, s);
        }
    };

    stopBlink = (selector: BlinkSelector, state: Model) => {
        selector(state).blinkFor = 0;
        state.game.registerBlink(false);
    };
}
