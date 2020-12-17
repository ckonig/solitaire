import Clock from "./Clock";
import HeartContainer from "./HeartContainer";
import Hint from "./Hint";
import React from "react";
import Undo from "./Undo";

const Header = (props) => {
    return (
        <div className="header">
            <div className="header-title">
                <HeartContainer recyclingMode={props.settings.launchSettings.recyclingMode} passes={props.model.passes} />
                <div className="icon-container">🏆</div> {props.model.points}
            </div>
            <Clock game={props.model} started={props.model.started} end={props.model.end} />
            <div className="header-buttons">
                <Hint suggestOnce={props.handlers.suggestOnce} suggestionMode={props.settings.suggestionMode} />
                <Undo undo={props.handlers.undo} model={props.model} />
                <div>
                    <button title="Restart" disabled={!props.model.previousStates.length} onClick={props.handlers.reset}>
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

export default Header;
