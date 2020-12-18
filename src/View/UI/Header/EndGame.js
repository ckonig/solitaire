import GlobalContext from "../../Context";
import React from "react";

const EndGame = () => {
    const { restart } = React.useContext(GlobalContext);

    return (
        <div>
            <button title="End Game" onClick={restart}>
                🗑️
            </button>
        </div>
    );
};
export default EndGame;
