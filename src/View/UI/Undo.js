import GlobalContext from "../Context";
import React from "react";

const Undo = () => {
    const { state, handlers } = React.useContext(GlobalContext);
    const ctrlZ = (e) => {
        const evtobj = window.event ? event : e;
        if (evtobj.keyCode == 90 && evtobj.ctrlKey) {
            handlers.undo();
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
                onClick={handlers.undo}
            >
                ⏪
            </button>
        </div>
    );
};

export default Undo;
