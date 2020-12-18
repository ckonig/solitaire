import "../Style/Screens.scss";

import GlobalContext from "../Context";
import React from "react";

const EndScreen = () => {
    const { state, restart } = React.useContext(GlobalContext);
    //@todo show launch settings (draw mode, recycling mode)
    return !state.game.isEnded ? null : (
        <div className="ui center endscreen">
            <div className="title">🥳</div>
            <div className="content">
                <div>Points: {state.game.points}</div>
                <div>Time: {state.game.getElapsed()}</div>
                <div>
                    <button onClick={restart}>
                        🗑️<div>New Game</div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EndScreen;
