import EndDisplay from "./EndDisplay";
import Foundation from "./Foundation";
import Header from "./Header";
import Menu from "./Menu";
import React from "react";
import Stock from "./Stock";
import Tableau from "./Tableau";
import Waste from "./Waste";

const Board = (props) => {
    return (
        <div>
            <div className="layout-grid-container">
                <Header
                    settings={props.model.settings}
                    undoLabel={props.handlers.undoLabel}
                    toggleMenu={props.handlers.toggleMenu}
                    reset={props.handlers.reset}
                    newGame={props.handlers.restart}
                    undo={props.handlers.undo}
                    beat={props.handlers.beat}
                    model={props.model.game}
                    suggestOnce={props.handlers.suggestOnce}
                />
                <div className="game-view">
                    <div className="board-grid-container">
                        <Stock model={props.model.stock} onClick={props.handlers.clickStock} />
                        <Waste model={props.model.waste} hand={props.model.hand} onClick={props.handlers.clickWaste} />
                        <div className="spacer">&nbsp;</div>
                        <Foundation.Stacks
                            settings={props.model.settings}
                            model={props.model.foundation}
                            hand={props.model.hand}
                            onClick={props.handlers.clickFoundation}
                        />
                        <Tableau.Stacks
                            settings={props.model.settings}
                            model={props.model.tableau}
                            hand={props.model.hand}
                            onClick={props.handlers.clickTableau}
                        />
                    </div>
                </div>
                <Menu
                    settings={props.model.settings}
                    undoLabel={props.handlers.undoLabel}
                    setMouseMode={props.handlers.setMouseMode}
                    setBaseEntropy={props.handlers.setBaseEntropy}
                    setInteractionEntropy={props.handlers.setInteractionEntropy}
                    setSuggestionMode={props.handlers.setSuggestionMode}
                    model={props.model.game}
                />
                <EndDisplay game={props.model.game} restart={props.handlers.restart} />
            </div>
        </div>
    );
};

export default Board;
