import "../Style/Screens.scss";

import GamePad from "../Game/GamePad";
import Keyboard from "../Game/Keyboard";
import PauseContext from "../PauseContext";
import React from "react";
import { Universal } from "../Game/KeyboardLayouts";

const PauseScreen = () => {
    const { state, togglePause } = React.useContext(PauseContext);
    const remaining = state.allowed - state.pauses.length - 1;

    let announcement = `You can pause the game ${remaining} more times.`;
    if (remaining == 1) {
        announcement = `You can pause the game ${remaining} more time.`;
    }
    if (remaining == 0) {
        announcement = "This is the last remaining pause. If you continue, no more pause will be possible.";
    }

    //@todo show launch settings (draw mode, recycling mode)
    const _toggle = () => togglePause(state.paused);
    return !state.paused || state.isSilent ? null : (
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
            <Keyboard layout={Universal} onAction={_toggle} onCancel={_toggle} />
            <GamePad onAction={_toggle} onCancel={_toggle} />
        </div>
    );
};

export default PauseScreen;
