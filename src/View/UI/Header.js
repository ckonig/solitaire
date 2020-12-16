import Clock from "./Clock";
import React from "react";
import Undo from "./Undo";

const Header = (props) => {
    const getHearts = () => {
        if (props.model.settings.launchSettings.recyclingMode == "infinite") {
            return "🖤";
        }
        if (props.model.settings.launchSettings.recyclingMode == "1-pass") {
            return props.model.passes > 0 ? "❤️" : "💔";
        }

        if (props.model.passes < 0) {
            return null;
        }

        return (
            Array.from(new Array(props.model.passes).keys())
                .map(() => "❤️")
                .join("") +
            Array.from(new Array(3 - props.model.passes).keys())
                .map(() => "💔")
                .join("")
        );
    };
    return (
        <div className="header">
            <div className="header-title">
                <div className="heart-container">{getHearts()}</div>
                <div className="icon-container">🏆</div> {props.model.points}
            </div>
            <Clock game={props.model} className="header-clock" started={props.model.started} end={props.model.end} />
            <div className="header-buttons">
                <div>
                    <button disabled={props.settings.suggestionMode !== "none"} title={"Hint"} onClick={() => props.suggestOnce()}>
                        💡
                    </button>
                </div>
                <Undo undo={props.undo} undoLabel={props.undoLabel} model={props.model} />

                <div>
                    <button disabled={!props.model.previousStates.length} title="Reset" onClick={props.reset}>
                        ♻️
                    </button>
                </div>
                <div>
                    <button title="New Game" onClick={props.newGame}>
                        🚮
                    </button>
                </div>
                <div>
                    <button title="Punch on table" onClick={props.beat}>
                        👊
                    </button>
                </div>
                <div>
                    <button title="Settings" onClick={() => props.toggleMenu(props.settings.showMenu)}>
                        ⚙️
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;
