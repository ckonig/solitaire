export default class Blinker {
    constructor(gamestate) {
        this.gamestate = gamestate;
    }

    startBlink = (selector, state) => {
        selector(state).blinkFor = 10;
        state.game.registerBlink();
        selector(state).unblink = () => setTimeout(() => this.stopBlink(selector), 100);
    };

    stopBlink = (selector) =>
        this.gamestate._setState((state) => {
            selector(state).blinkFor = 0;
            state.game.registerBlink();
        });
}
