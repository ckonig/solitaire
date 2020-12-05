import Model from "../Model/Facade";

export default class Service {
    constructor(stateholder) {
        this._setState = (a, b) =>
            stateholder.setState((state) => {
                state.game.modified = false;
                const previous = Model.copy(state);
                a(state);
                if (state.game.modified) {
                    previous.game.modified = false;
                    state.game.previousStates.push(previous);
                    // @todo enable browser navigation (back) for undoing 
                    // stateholder.navigate(state.game.previousStates.length);
                }
                return { ...state };
            }, b);
    }

    dispatchPutDown = (card, index) => {
        this._setState((state) => {
            if (state.hand.isHoldingCard()) {
                this._dispatchPutDown(card, state, index);
            }
        });
    };

    dispatchPickup = (card, index) => {
        this._setState((state) => {
            if (!state.hand.isHoldingCard()) {
                this._dispatchPickup(card, state, index);
            }
        });
    };

    _blink = (selector, state) => this.startBlink(selector, 10, state);

    startBlink = (selector, blinkFor, state) => {
        selector(state).blinkFor = blinkFor;
        selector(state).unblink = () => setTimeout(() => this.toggleBlink(selector, 0), 100);
    };

    toggleBlink = (selector, blinkFor) =>
        this._setState((state) => {
            selector(state).blinkFor = blinkFor;
        });
}
