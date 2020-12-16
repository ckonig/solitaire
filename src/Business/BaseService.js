import Blinker from "./Blinker";

export default class Service {
    constructor(gamestate) {
        this.gamestate = gamestate;
        this.blinker = new Blinker(gamestate);
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
