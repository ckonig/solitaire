import Icon from "@mdi/react";
import React from "react";
import { mdiArrowULeftBottom } from "@mdi/js";
import useGlobalContext from "../../GlobalContext";

const Undo = () => {
    const { state, replaceContext } = useGlobalContext();

    const undo = () =>
        replaceContext((_state) => {
            const previous = _state.game.timemachine.popPreviousState(state.game.timemachine.previousStates.length - 1, state);
            if (previous) {
                previous.game.rating.penalize(_state.game.rating);
                return previous;
            }
            return null;
        });

    if (!state.game.timemachine.previousStates.length) {
        return null;
    }

    return (
        <div>
            <button
                disabled={!state.game.timemachine.previousStates.length}
                title={"Undo"}
                data-penalty={Math.pow(2, state.game.rating.multiplicator)}
                onClick={undo}
            >
                <span className="icon">
                    <Icon path={mdiArrowULeftBottom} size=".8em" />
                </span>
            </button>
        </div>
    );
};

export default Undo;
