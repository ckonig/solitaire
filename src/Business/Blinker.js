export default class Blinker {
    constructor(updateGameContext) {
        this.updateGameContext = updateGameContext;
    }

    startBlink = (selector, state) => {
        selector(state).blinkFor = 10;
        state.game.registerBlink();
        selector(state).unblink = () => this.stopBlink(selector);
    };

    stopBlink = (selector) =>
        this.updateGameContext((state) => {
            selector(state).blinkFor = 0;
            state.game.registerBlink();
        });
}
