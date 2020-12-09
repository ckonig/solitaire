import Model from "../Model/Facade";

export default class GameState {
    constructor(stateholder, suggestor) {
        this.stateholder = stateholder;
        this.suggestor = suggestor;
    }

    //@todo deprecate uncontrolled usage here
    setState = (a, b) => this.stateholder.setState(a, b);

    _setState = (a, b) =>
        this.stateholder.setState((state) => {
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
