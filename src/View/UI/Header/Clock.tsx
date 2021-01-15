import React from "react";
import useGameContext from "../../Game/GameContext";
import usePauseContext from "../../Game/PauseContext";

const Clock = () => {
    const { state, getElapsed } = usePauseContext();
    const { gameState } = useGameContext();
    const [elapsed, setElapsed] = React.useState("");
    React.useEffect(() => {
        const interval = setInterval(() => {
            if (gameState.started && !state.paused) {
                setElapsed(getElapsed());
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [gameState.started, state.paused, getElapsed]);

    return !gameState.started || !elapsed ? null : (
        <div className="header-clock">
            <div className="icon-container">🕒</div>
            {elapsed}
        </div>
    );
};

export default Clock;
