import Actions from "./Actions";

export default class Base {
    constructor(stateholder) {
        this.stateHolder = stateholder;
        this.actions = new Actions(stateholder);
        this.hand = () => stateholder.state.hand;
        this.state = () => stateholder.state;
    }
    
    _blink = (selector) => this._toggleBlink(selector, 10, () => setTimeout(() => this._toggleBlink(selector, 0), 100))

    _toggleBlink(selector, blinkFor, cb) {
        this.stateHolder.setState((state) => {
            selector(state).blinkFor = blinkFor;
            return { ...state };
        }, cb);
    }
}