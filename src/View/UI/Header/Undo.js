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

    const ctrlZ = (e) => {
        const evtobj = window.event ? event : e;
        if (evtobj.keyCode == 90 && evtobj.ctrlKey) {
            undo();
        }
    };

    React.useEffect(() => {
        document.addEventListener("keydown", ctrlZ);
        return () => document.removeEventListener("keydown", ctrlZ);
    });

    return (
        <div>
            <button
                disabled={!state.game.timemachine.previousStates.length}
                title={"Undo (Penalty:" + Math.pow(2, state.game.rating.multiplicator) + ")"}
                onClick={undo}
            >
                ⏪
            </button>
        </div>
    );
};

export default Undo;
