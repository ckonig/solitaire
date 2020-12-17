import "../../Style/Header.css";

import Clock from "./Clock";
import GlobalContext from "../Context";
import HeartContainer from "./HeartContainer";
import Hint from "./Hint";
import React from "react";
import Undo from "./Undo";

const Header = () => {
    const { state, handlers } = React.useContext(GlobalContext);
    return (
        <div className="header">
            <div className="header-title">
                <HeartContainer />
                <div className="icon-container">🏆</div> {state.game.rating.points}
            </div>
            <Clock />
            <div className="header-buttons">
                <Hint />
                <Undo />
                <div>
                    <button title="Restart" disabled={!state.game.timemachine.previousStates.length} onClick={handlers.reset}>
                        ♻️
                    </button>
                </div>
                <div>
                    <button title="End Game" onClick={handlers.restart}>
                        🗑️
                    </button>
                </div>
                <div>
                    <button title="Settings" onClick={() => handlers.toggleMenu(state.settings.showMenu)}>
                        ⚙️
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Header;
