import PauseContext from "../../Game/PauseContext";
import React from "react";
import useGameContext from "../../Game/GameContext";

const Clock = () => {
    const { state, getElapsed } = React.useContext(PauseContext);
    const { gameState } = useGameContext();
    const [elapsed, setElapsed] = React.useState("");
    React.useEffect(() => {
        const interval = setInterval(() => {
            if (gameState.started && !state.paused) {
                setElapsed(getElapsed());
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [gameState.started, state.paused]);

    return !gameState.started || !elapsed ? null : (
        <div className="header-clock">
            <div className="icon-container">🕒</div>
            {elapsed}
        </div>
    );
};

export default Clock;
