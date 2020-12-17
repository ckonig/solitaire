import "../../Style/Screens.css";

import GlobalContext from "../Context";
import React from "react";

const EndScreen = () => {
    const {state, handlers} = React.useContext(GlobalContext);
    //@todo show launch settings (draw mode, recycling mode)
    return !state.game.isEnded ? null : (
        <div className="endscreen">
            <div className="title">🥳</div>
            <div>Points: {state.game.points}</div>
            <div>Time: {state.game.getElapsed()}</div>
            <div>
                <button onClick={handlers.restart}>
                    ♻️<div>new game</div>
                </button>
            </div>
        </div>
    );
};

export default EndScreen;
