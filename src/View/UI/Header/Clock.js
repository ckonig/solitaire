import GlobalContext from "../../Context";
import React from "react";

const Clock = () => {
    const { state } = React.useContext(GlobalContext);
    const [elapsed, setElapsed] = React.useState(0);
    React.useEffect(() => {
        const interval = setInterval(() => {
            if (state.game.started) {
                setElapsed(state.game.getElapsed());
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [state.game]);

    return !state.game.started || !state.game.getElapsed() ? null : (
        <div className="header-clock">
            <div className="icon-container">🕒</div>
            {elapsed}
        </div>
    );
};

export default Clock;
