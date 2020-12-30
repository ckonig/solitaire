import GlobalContext from "../../Context";
import React from "react";

const Undo = () => {
    const { state, replaceContext } = React.useContext(GlobalContext);
    const undo = () =>
        replaceContext((_state) => {
            const previous = _state.game.timemachine.popPreviousState(state.game.timemachine.previousStates.length - 1, state);
            if (previous) {
                previous.game.rating.penalize(_state.game.rating);
                return previous;
            }
            return null;
        });

    return (
        <div>
            <button
                disabled={!state.game.timemachine.previousStates.length}
                title={"Undo (Penalty:" + Math.pow(2, state.game.rating.multiplicator) + ")"}
                onClick={undo}
            >
                <span className="icon">⏪</span> Undo
            </button>
        </div>
    );
};

export default Undo;
