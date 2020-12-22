import PauseContext from "../../PauseContext";
import React from "react";

const Clock = () => {
    const { state, getElapsed } = React.useContext(PauseContext);
    const [elapsed, setElapsed] = React.useState(0);
    React.useEffect(() => {
        const interval = setInterval(() => {
            if (state.started && !state.paused) {
                setElapsed(getElapsed());
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [state.started, state.paused]);

    return !state.started || elapsed <= 0 ? null : (
        <div className="header-clock">
            <div className="icon-container">🕒</div>
            {elapsed}
        </div>
    );
};

export default Clock;
