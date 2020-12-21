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
    //@todo show launch settings (draw mode, recycling mode)
    return !state.game.paused ? null : (
        <div className="ui center endscreen">
            <div className="title">😴</div>
            <div className="content">
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
