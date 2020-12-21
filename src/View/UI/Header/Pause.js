import GlobalContext from "../../Context";
import React from "react";

const Pause = () => {
    const { state, updateContext } = React.useContext(GlobalContext);
    const isPaused = !!state.game.paused;
    const pause = () =>
        updateContext((ctx) => {
            ctx.game.togglePause(isPaused);
        });

    return (
        <div>
            <button onClick={pause}>{isPaused ? "▶️" : "⏸️"}</button>
        </div>
    );
};

export default Pause;
