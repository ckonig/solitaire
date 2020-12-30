import "../Style/Board.scss";

import BoardNavigator from "./BoardNavigator";
import Dealer from "./Dealer";
import Foundation from "./Foundation";
import Header from "../UI/Header/Header";
import Menu from "../UI/Menu";
import PauseScreen from "../UI/PauseScreen";
import React from "react";
import Stock from "./Stock";
import Tableau from "./Tableau";
import Waste from "./Waste";

const Board = (props: any) => (
    <>
        <Menu />
        <Header mode={props.mode} />
        <div className={"board-jail " + props.mode}>
            <div className={"board-grid-container " + props.mode}>
                <Stock />
                <Waste />
                <div className="spacer">&nbsp;</div>
                <Foundation.Stacks />
                <Tableau.Stacks />
            </div>

            <PauseScreen />
        </div>
        <Dealer />
        <BoardNavigator />
    </>
);

export default Board;
