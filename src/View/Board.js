import Footer from "./Footer";
import Foundation from "./Foundation";
import React from "react";
import Stock from "./Stock";
import Tableau from "./Tableau";
import Waste from "./Waste";

const Board = (props) => {
    return (
        <div>
            <div className="layout-grid-container">
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
                <Footer
                    //@todo shrink interface
                    reset={props.handlers.reset}
                    undoLabel={props.handlers.undoLabel}
                    undo={props.handlers.undo}
                    setMouseMode={props.handlers.setMouseMode}
                    setBaseEntropy={props.handlers.setBaseEntropy}
                    setInteractionEntropy={props.handlers.setInteractionEntropy}
                    setSuggestionMode={props.handlers.setSuggestionMode}
                    beat={props.handlers.beat}
                    settings={props.model.settings}
                    model={props.model.game}
                />
            </div>
        </div>
    );
};

export default Board;
