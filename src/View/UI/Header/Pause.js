import PauseContext from "../../PauseContext";
import React from "react";

const Pause = () => {
    const { state, togglePause } = React.useContext(PauseContext);

    return state.pauses.length < state.allowed ? (
        <div>
            <button title={`Pause - ${state.allowed-state.pauses.length} remaining`} disabled={state.paused} onClick={() => togglePause(state.paused)}>{state.paused ? "▶️" : "⏸️"}</button>
        </div>
    ) : null;
};

export default Pause;
