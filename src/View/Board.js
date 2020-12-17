import EndScreen from "./UI/EndScreen";
import Foundation from "./Foundation";
import Header from "./UI/Header";
import Menu from "./UI/Menu";
import React from "react";
import Stock from "./Stock";
import Tableau from "./Tableau";
import Waste from "./Waste";

const Board = (props) => {
    return (
        <div>
            <div className="layout-grid-container">
                <Header model={props.model.game} settings={props.model.settings} handlers={props.handlers} />
                <div className="game-view">
                    <div className="board-grid-container">
                        <Stock model={props.model.stock} onClick={props.handlers.clickStock} />
                        <Waste
                            model={props.model.waste}
                            hand={props.model.hand}
                            onClick={props.handlers.clickWaste}
                            settings={props.model.settings}
                        />
                        <div className="spacer">&nbsp;</div>
                        <Foundation.Stacks
                            model={props.model.foundation}
                            hand={props.model.hand}
                            onClick={props.handlers.clickFoundation}
                            settings={props.model.settings}
                        />
                        <Tableau.Stacks
                            model={props.model.tableau}
                            hand={props.model.hand}
                            onClick={props.handlers.clickTableau}
                            settings={props.model.settings}
                        />
                    </div>
                </div>
                <Menu model={props.model.game} settings={props.model.settings} handlers={props.handlers} />
                <EndScreen game={props.model.game} restart={props.handlers.restart} />
            </div>
        </div>
    );
};
export default Board;
