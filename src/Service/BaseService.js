import Actions from "./Actions";

export default class Service {
    constructor(stateholder) {
        this.actions = new Actions();
        this._setState = (a, b) => stateholder.setState((state) => {
            a(state);
            return { ...state };
        }, b);
        this.hand = () => stateholder.state.hand;
        this.state = () => stateholder.state;
    }

    _blink = (selector) => this._toggleBlink(selector, 10, () => setTimeout(() => this._toggleBlink(selector, 0), 100))

    _toggleBlink(selector, blinkFor, cb) {
        this._setState((state) => {
            selector(state).blinkFor = blinkFor;
        }, cb);
    }
}