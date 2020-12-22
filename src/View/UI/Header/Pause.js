import PauseContext from "../../PauseContext";
import React from "react";

const Pause = () => {
    const { state, togglePause } = React.useContext(PauseContext);

    return state.pauses.length < 3 ? (
        <div>
            <button onClick={() => togglePause(state.paused)}>{state.paused ? "▶️" : "⏸️"}</button>
        </div>
    ) : null;
};

export default Pause;
