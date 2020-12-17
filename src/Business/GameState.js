import Model from "../Model/Model";

export default class GameState {
    constructor(stateholder, suggestor) {
        this.stateholder = stateholder;
        this.suggestor = suggestor;
    }

    _setState = (a, b) =>
        this.stateholder.setState((state) => {
            state.game.timemachine.modified = false;
            const previous = Model.copy(state);
            a(state);
            if (state.game.timemachine.modified && state.stock.isDealt) {
                //@todo use localstorage for previous state, reduce react state for performance

                //@todo introduce timemachine model, that only does undoing etc
                state.game.timemachine.pushPreviousState(previous);
                //@todo there must be a better way for a pipeline-like thing like this
                this.suggestor.evaluateOptions(state);
                return { ...state };
            }

            return null;
        }, b);
}
