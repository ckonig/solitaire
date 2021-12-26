import Icon from "@mdi/react";
import React from "react";
import { mdiClock } from "@mdi/js";
import useGameContext from "../../Context/GameContext";
import usePauseContext from "../../Context/PauseContext";

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
            <div className="icon-container">
                <Icon path={mdiClock} size=".9em" />
            </div>
            {elapsed}
        </div>
    );
};

export default Clock;
