import GlobalContext from "../../Context";
import React from "react";

const RestartGame = () => {
    const { state, replaceContext } = React.useContext(GlobalContext);

    const reset = () =>
        replaceContext((state) => (state.game.timemachine.previousStates ? state.game.timemachine.previousStates[0] : null));

    return (
        <div>
            <button title="Restart" disabled={!state.game.timemachine.previousStates.length} onClick={reset}>
                ♻️
            </button>
        </div>
    );
};

export default RestartGame;
