import Clock from "./Clock";
import React from "react";
import Undo from "./Undo";

const Header = (props) => (
    <div className="header">
        <div className="header-title">
            <div className="icon-container">🏆</div> {props.model.points}
        </div>
        <Clock className="header-clock" started={props.model.started} end={props.model.end} />
        <div className="header-buttons">
            <div>
                <button disabled={props.settings.suggestionMode !== "none"} title={"Hint"} onClick={() => props.suggestOnce()}>
                    💡
                </button>
            </div>
            <Undo undo={props.undo} undoLabel={props.undoLabel} model={props.model} />
            <div>
                <button title="Punch on table" onClick={props.beat}>
                    👊
                </button>
            </div>
            <div>
                <button disabled={!props.model.previousStates.length} title="Reset" onClick={props.reset}>
                    🔄
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

export default Header;
