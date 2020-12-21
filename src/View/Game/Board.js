import "../Style/Board.scss";

import BoardNavigator from "./BoardNavigator";
import Dealer from "./Dealer";
import Foundation from "./Foundation";
import Header from "../UI/Header/Header";
import React from "react";
import Stock from "./Stock";
import Tableau from "./Tableau";
import Waste from "./Waste";

const Board = (props) => (
    <>
        <div className={"layout-grid-container " + props.mode}>
            <Header />
            <div className="board-grid-container">
                <Stock />
                <Waste />
                <div className="spacer">&nbsp;</div>
                <Foundation.Stacks />
                <Tableau.Stacks />
            </div>
        </div>
        <Dealer />
        <BoardNavigator />
    </>
);

export default Board;
