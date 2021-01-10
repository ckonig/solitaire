import "../Style/Board.scss";

import BoardNavigator from "./Navigation/BoardNavigator";
import Dealer from "./Dealer";
import FoundationStacks from "./Foundation";
import Header from "../UI/Header/Header";
import Menu from "../UI/Menu";
import React from "react";
import Stock from "./Stock";
import TableauStacks from "./Tableau";
import Waste from "./Waste";

type BoardProps = { mode: string };
const Board = (props: BoardProps) => (
    <>
        <Menu />
        <Header mode={props.mode} />
        <div className={"board-jail " + props.mode}>
            <div className={"board-grid-container " + props.mode}>
                <Stock />
                <Waste />
                <div className="spacer">&nbsp;</div>
                <FoundationStacks />
                <TableauStacks />
            </div>
        </div>
        <Dealer />
        <BoardNavigator />
    </>
);

export default Board;
