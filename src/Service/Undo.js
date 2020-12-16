export default class Undo {
    constructor(getInitialState, suggestor) {
        this.getInitialState = getInitialState;
        this.suggestor = suggestor;
    }

    //@todo ask for confirmation before resetting
    reset = (stateholder) =>
        stateholder.setState((state) => (state.game.previousStates ? state.game.previousStates[0] : { ...this.getInitialState() }));

    // @todo enable undoing via browser back gesture/button
    undo = (id, stateholder, currentState) =>
        stateholder.setState((state) => {
            const previous = state.game.popPreviousState(id, currentState);
            if (previous) {
                this.suggestor.evaluateOptions(previous);
                return previous;
            }

            return null;
        });

    getHandlers(stateholder, state) {
        return {
            undo: () => this.undo(state.game.previousStates.length - 1, stateholder, state),
            reset: () => this.reset(stateholder),
        };
    }
}
