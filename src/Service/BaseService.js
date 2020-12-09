import Model from "../Model/Facade";

export default class Service {
    constructor(stateholder, suggestor) {
        this.suggestor = suggestor;
        this._setState = (a, b) =>
            stateholder.setState((state) => {
                state.game.modified = false;
                const previous = Model.copy(state);
                a(state);
                if (state.game.modified) {
                    //@todo  use localstorage for previous state, reduce react state for performance
                    state.game.pushPreviousState(previous);
                    this.suggestor.evaluateOptions(state);
                    return { ...state };
                }

                // @todo enable undoing via browser back gesture/button
                return null;
            }, b);
    }

    getHandler(hand) {
        let handler = "dispatchPickup";
        if (hand && hand.isHoldingCard()) {
            handler = "dispatchPutDown";
        }
        return this[handler];
    }

    dispatchPutDown = (card, position, index) => {
        this._setState((state) => {
            if (state.hand.isHoldingCard()) {
                this._dispatchPutDown(card, position, state, index);
            }
        });
    };

    dispatchPickup = (card, position, index) => {
        this._setState((state) => {
            if (!state.hand.isHoldingCard()) {
                this._dispatchPickup(card, position, state, index);
            }
        });
    };

    _blink = (selector, state) => this.startBlink(selector, 10, state);

    startBlink = (selector, blinkFor, state) => {
        selector(state).blinkFor = blinkFor;
        state.game.registerBlink();
        selector(state).unblink = () => setTimeout(() => this.toggleBlink(selector, 0), 100);
    };

    toggleBlink = (selector, blinkFor) =>
        this._setState((state) => {
            selector(state).blinkFor = blinkFor;
            state.game.registerBlink();
        });
}
