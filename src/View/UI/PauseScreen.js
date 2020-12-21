import "../Style/Screens.scss";

import GlobalContext from "../Context";
import Navigator from "../Navigator";
import React from "react";

const PauseScreen = () => {
    const { state, updateContext } = React.useContext(GlobalContext);
    const isPaused = state.game.paused;
    const unpause = () =>
        updateContext((ctx) => {
            ctx.game.togglePause(isPaused);
        });
    const timesPaused = state.game.pauses.length;
    const remaining = 2 - timesPaused;

    //@todo proper I18N
    let announcement = `You can pause the game ${remaining} more times.`;
    if (remaining == 1) {
        announcement = `You can pause the game ${remaining} more time.`;
    }
    if (remaining == 0) {
        announcement = "This is the last remaining pause. If you continue, no more pause will be possible.";
    }

    //@todo show launch settings (draw mode, recycling mode)
    return !state.game.paused ? null : (
        <div className="ui center endscreen">
            <div className="title">😴</div>
            <div className="content">
                <div>{announcement}</div>
                <div>
                    <button onClick={unpause}>
                        ▶️<div>Continue</div>
                    </button>
                </div>
            </div>
            <Navigator onAction={unpause} onCancel={unpause} />
        </div>
    );
};

export default PauseScreen;
