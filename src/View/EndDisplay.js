import React from "react";

const EndDisplay = (props) => {
    return !props.game.isEnded ? null : (
        <div className="endscreen align-center">
            <h1>🥳</h1>
            <div>Points: {props.game.points}</div>
            <div>Time: {props.game.getElapsed()}</div>
            <button onClick={props.restart}>new game</button>
        </div>
    );
};

export default EndDisplay;
