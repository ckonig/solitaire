import "../../Style/Header.css";

import Clock from "./Clock";
import GlobalState from "../Context";
import HeartContainer from "./HeartContainer";
import Hint from "./Hint";
import React from "react";
import Undo from "./Undo";

const Header = (props, context) => {
    return (
        <div className="header">
            <div className="header-title">
                <HeartContainer />
                <div className="icon-container">🏆</div> {context.state.game.points}
            </div>
            <Clock />
            <div className="header-buttons">
                <Hint suggestOnce={props.handlers.suggestOnce} suggestionMode={props.settings.suggestionMode} />
                <Undo undo={props.handlers.undo} game={props.game} />
                <div>
                    <button title="Restart" disabled={!props.game.previousStates.length} onClick={props.handlers.reset}>
                        ♻️
                    </button>
                </div>
                <div>
                    <button title="End Game" onClick={props.handlers.restart}>
                        🗑️
                    </button>
                </div>
                <div>
                    <button title="Settings" onClick={() => props.handlers.toggleMenu(props.settings.showMenu)}>
                        ⚙️
                    </button>
                </div>
            </div>
        </div>
    );
};
Header.contextTypes = GlobalState;
export default Header;
