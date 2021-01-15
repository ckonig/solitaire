import React from "react";
import { useBoardContext } from "../../Game/BoardContext";
import usePauseContext from "../../Game/PauseContext";

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
