import { BoardContext } from "../../Game/BoardContext";
import PauseContext from "../../PauseContext";
import React from "react";

const ToggleMenu = () => {
    const paused = React.useContext(PauseContext);
    const { player } = React.useContext(BoardContext);

    return (
        <div>
            <button title="Settings" onClick={() => paused.togglePause(!paused.state.paused, player)}>
                <span className="icon">☰</span>
            </button>
        </div>
    );
};

export default ToggleMenu;
