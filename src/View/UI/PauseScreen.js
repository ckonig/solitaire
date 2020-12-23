import "../Style/Screens.scss";

import GamePad from "../Game/GamePad";
import GlobalContext from "../Context";
import Keyboard from "../Game/Keyboard";
import PauseContext from "../PauseContext";
import React from "react";

const PauseScreen = () => {
    const globalCtx = React.useContext(GlobalContext);
    const { state, togglePause } = React.useContext(PauseContext);
    const remaining = state.allowed - state.pauses.length - 1;

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
    return !state.paused || (state.isSilent && state.isSilent == globalCtx.state.player) ? null : (
        <div className="ui neutral endscreen">
            <div className="title">😴</div>
            <div className="content">
                <div>{announcement}</div>
                <div>
                    {state.isSilent ? (
                        "Wait for Player " + state.isSilent + " to continue."
                    ) : (
                        <button onClick={_toggle}>
                            ▶️<div>Continue</div>
                        </button>
                    )}
                </div>
            </div>
            <Keyboard onAction={_toggle} onCancel={_toggle} />
            <GamePad onAction={_toggle} onCancel={_toggle} />
        </div>
    );
};

export default PauseScreen;