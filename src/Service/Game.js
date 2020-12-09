export default class Game {
    constructor(getInitialState) {
        this.getInitialState = getInitialState;
    }

    reset = (stateholder) =>
        stateholder.setState((state) => (state.game.previousStates ? state.game.previousStates[0] : { ...this.getInitialState() }));

    undo = (id, stateholder, currentState) => stateholder.setState((state) => state.game.popPreviousState(id, currentState) || null);

    undoLabel = (stateholder) => Math.pow(2, stateholder.state.game.multiplicator);

    getHandlers(stateholder, state) {
        return {
            undo: () => this.undo(state.game.previousStates.length - 1, stateholder, state),
            reset: () => this.reset(stateholder),
            undoLabel: () => Math.pow(2, stateholder.state.game.multiplicator),
        };
    }
}
