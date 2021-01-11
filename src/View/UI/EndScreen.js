import "./Screens.scss";

import GlobalContext from "../Context";
import PauseContext from "../PauseContext";
import React from "react";

const EndScreen = () => {
    const { state, restart } = React.useContext(GlobalContext);
    const pause = React.useContext(PauseContext);
    //@todo show launch settings (draw mode, recycling mode)
    return !state.game.isEnded ? null : (
        <div className="ui neutral endscreen">
            <div className="title">🥳</div>
            <div className="content">
                <div>Time: {pause.getElapsed()}</div>
                <div>Points: {state.game.rating.points}</div>
                <div>Time Penalty: {state.game.rating.getTimePenalty(state.game.started, state.game.end || Date.now())}</div>
                <div>Bonus Points: {state.game.rating.getBonusPoints(state.game.started, state.game.end || Date.now())}</div>
                <div>Total Points: {state.game.rating.getTotal(state.game.started, state.game.end || Date.now())}</div>
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
