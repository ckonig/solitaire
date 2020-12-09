export default class Game {
    constructor(getInitialState, suggestor) {
        this.getInitialState = getInitialState;
        this.suggestor = suggestor;
    }

    reset = (stateholder) =>
        stateholder.setState((state) => (state.game.previousStates ? state.game.previousStates[0] : { ...this.getInitialState() }));

    undo = (id, stateholder, currentState) => stateholder.setState((state) => {
        const previous = state.game.popPreviousState(id, currentState);
        if (previous) {
            this.suggestor.evaluateOptions(previous);
            return previous;
        }

        return null;
    });

    undoLabel = (stateholder) => Math.pow(2, stateholder.state.game.multiplicator);

    getHandlers(stateholder, state) {
        return {
            undo: () => this.undo(state.game.previousStates.length - 1, stateholder, state),
            reset: () => this.reset(stateholder),
            undoLabel: () => Math.pow(2, stateholder.state.game.multiplicator),
        };
    }
}
