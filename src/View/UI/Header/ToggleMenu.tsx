import React from "react";
import { useBoardContext } from "../../Context/BoardContext";
import usePauseContext from "../../Context/PauseContext";

const ToggleMenu = () => {
    const paused = usePauseContext();
    const { player } = useBoardContext();

    return paused.state.showMenu ? null : (
        <div>
            <button title="Settings" onClick={() => paused.togglePause(!paused.state.paused, player)}>
                <span className="icon">☰</span>
            </button>
        </div>
    );
};

export default ToggleMenu;
