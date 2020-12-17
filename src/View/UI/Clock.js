import GlobalState from "../Context";
import React from "react";

const Clock = (props, context) => {
    const [elapsed, setElapsed] = React.useState(0);
    React.useEffect(() => {
        const interval = setInterval(() => {
            if (context.state.game.started) {
                setElapsed(context.state.game.getElapsed());
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return !context.state.game.started || !elapsed ? null : (
        <div className="header-clock">
            <div className="icon-container">🕒</div>
            {elapsed}
        </div>
    );
};

Clock.contextTypes = GlobalState;
export default Clock;
