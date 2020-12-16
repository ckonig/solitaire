import Model from "../Model/Facade";
import Suggestions from "../Service/Suggestions";

export default class GameState {
    constructor(stateholder) {
        this.stateholder = stateholder;
        this.suggestor = new Suggestions();
    }

    _setState = (a, b) =>
        this.stateholder.setState((state) => {
            state.game.modified = false;
            const previous = Model.copy(state);
            a(state);
            if (state.game.modified && state.stock.isDealt) {
                //@todo use localstorage for previous state, reduce react state for performance
                state.game.pushPreviousState(previous);
                //@todo there must be a better way for a pipeline-like thing like this
                this.suggestor.evaluateOptions(state);
                return { ...state };
            }

            return null;
        }, b);
}
