import Blinker from "./Blinker";
import GameState from "./GameState";

export default class Service {
    constructor(stateholder) {
        this.gamestate = new GameState(stateholder);
        this.blinker = new Blinker(this.gamestate);
    }

    getHandler(hand) {
        let handler = "dispatchPickup";
        if (hand && hand.isHoldingCard()) {
            handler = "dispatchPutDown";
        }
        return this[handler];
    }

    dispatchPutDown = (card, position, index) => {
        this.gamestate._setState((state) => {
            if (state.hand.isHoldingCard()) {
                this._dispatchPutDown(card, position, state, index);
            }
        });
    };

    dispatchPickup = (card, position, index) => {
        this.gamestate._setState((state) => {
            if (!state.hand.isHoldingCard()) {
                this._dispatchPickup(card, position, state, index);
            }
        });
    };

    _blink = (selector, state) => this.blinker.startBlink(selector, state);
}
