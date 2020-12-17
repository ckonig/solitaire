import "../../Style/Screens.css";

import React from "react";

const EndScreen = (props) => {
    //@todo show launch settings (draw mode, recycling mode)
    return !props.game.isEnded ? null : (
        <div className="endscreen">
            <div className="title">🥳</div>
            <div>Points: {props.game.points}</div>
            <div>Time: {props.game.getElapsed()}</div>
            <div>
                <button onClick={props.restart}>
                    ♻️<div>new game</div>
                </button>
            </div>
        </div>
    );
};

export default EndScreen;
