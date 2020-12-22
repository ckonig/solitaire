import "../Style/Screens.scss";

import GamePad from "../Game/GamePad";
import Keyboard from "../Game/Keyboard";
import PauseContext from "../PauseContext";
import React from "react";

const PauseScreen = () => {
    const { state, togglePause } = React.useContext(PauseContext);
    const remaining = 2 - state.pauses.length;

    //@todo proper I18N
    let announcement = `You can pause the game ${remaining} more times.`;
    if (remaining == 1) {
        announcement = `You can pause the game ${remaining} more time.`;
    }
    if (remaining == 0) {
        announcement = "This is the last remaining pause. If you continue, no more pause will be possible.";
    }

    //@todo show launch settings (draw mode, recycling mode)
    const _toggle = () => togglePause(state.paused);
    return !state.paused ? null : (
        <div className="ui center endscreen">
            <div className="title">😴</div>
            <div className="content">
                <div>{announcement}</div>
                <div>
                    <button onClick={_toggle}>
                        ▶️<div>Continue</div>
                    </button>
                </div>
            </div>
            <Keyboard onAction={_toggle} onCancel={_toggle} />
            <GamePad onAction={_toggle} onCancel={_toggle} />
        </div>
    );
};

export default PauseScreen;
