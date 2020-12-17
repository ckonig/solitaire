export default class Undo {
    constructor(suggestor, stateholder) {
        this.suggestor = suggestor;
        this.stateholder = stateholder;
    }

    //@todo ask for confirmation before resetting
    reset = () => this.stateholder.setState((state) => (state.game.previousStates ? state.game.previousStates[0] : null));

    // @todo enable undoing via browser back gesture/button
    undo = (id, currentState) =>
        this.stateholder.setState((state) => {
            const previous = state.game.popPreviousState(id, currentState);
            if (previous) {
                this.suggestor.evaluateOptions(previous);
                return previous;
            }

            return null;
        });

    static getHandlers(suggestor, stateholder, state) {
        const undo = new Undo(suggestor, stateholder);
        return {
            undo: () => undo.undo(state.game.previousStates.length - 1, state),
            reset: () => undo.reset(),
        };
    }
}
