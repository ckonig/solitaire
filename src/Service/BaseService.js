export default class Service {
    constructor(stateholder) {
        this._setState = (a, b) =>
            stateholder.setState((state) => {
                a(state);
                return { ...state };
            }, b);
        this.hand = () => stateholder.state.hand;
        this.state = () => stateholder.state;
    }

    dispatchPutDown = (card, index) => {
        this._setState((state) => {
            if (state.hand.isHoldingCard()) {
                this._dispatchPutDown(card, index, state);
            } else {
                console.debug("avoided double execution putdown (thx 2 strict mode)");
            }
        });
    };

    dispatchPickup = (card, index) => {
        this._setState((state) => {
            if (!state.hand.isHoldingCard()) {
                this._dispatchPickup(card, index, state);
            } else {
                console.debug("avoided double execution pickup (thx 2 strict mode)");
            }
        });
    };

    _blink = (selector) => this.startBlink(selector, 10);

    startBlink = (selector, blinkFor) => {
        this._setState((state) => {
            selector(state).blinkFor = blinkFor;
            selector(state).unblink = () => setTimeout(() => this.toggleBlink(selector, 0), 100);
        });
    };

    //@todo set timeout after mounting component for best controlled effect
    toggleBlink = (selector, blinkFor) =>
        this._setState((state) => {
            selector(state).blinkFor = blinkFor;
        });

    //@todo add universal click handler, as the only place where setState is applied.
}
