export default class Blinker {
    constructor(gamestate) {
        this.gamestate = gamestate;
    }

    startBlink = (selector, state) => {
        selector(state).blinkFor = 10;
        state.game.registerBlink();
        selector(state).unblink = () => this.stopBlink(selector);
    };

    stopBlink = (selector) =>
        this.gamestate._setState((state) => {
            selector(state).blinkFor = 0;
            state.game.registerBlink();
        });
}
