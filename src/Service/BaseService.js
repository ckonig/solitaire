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

    _blink = (selector) => this.toggleBlink(selector, 10, () => setTimeout(() => this.toggleBlink(selector, 0), 100));

    //@todo set timeout after mounting component for best controlled effect
    toggleBlink = (selector, blinkFor, cb) =>
        this._setState((state) => {
            selector(state).blinkFor = blinkFor;
        }, cb);

    //@todo add universal click handler, as the only place where setState is applied.

}
