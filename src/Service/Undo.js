export default class Undo {
    constructor(suggestor, stateholder, currentState) {
        this.suggestor = suggestor;
        this.stateholder = stateholder;
        this.currentState = currentState;
    }

    //@todo ask for confirmation before resetting
    reset = () => this.stateholder.setState((state) => (state.game.timemachine.previousStates ? state.game.timemachine.previousStates[0] : null));

    // @todo enable undoing via browser back gesture/button
    undo = () =>
        this.stateholder.setState((state) => {
            const previous = state.game.timemachine.popPreviousState(this.currentState.game.timemachine.previousStates.length - 1, this.currentState);
            if (previous) {
                previous.game.rating.penalize(state.game.rating);
                this.suggestor.evaluateOptions(previous);
                return previous;
            }
            return null;
        });
}
