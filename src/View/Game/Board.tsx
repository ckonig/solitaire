import "./Board.scss";
import "react-toastify/dist/ReactToastify.min.css";

import { Slide, ToastContainer } from "react-toastify";

import BoardNavigator from "./Navigation/BoardNavigator";
import Dealer from "./Dealer";
import DndPreview from "../../common/DndPreview";
import FoundationStacks from "./Foundation";
import Header from "../UI/Header/Header";
import Judge from "./Judge";
import Menu from "../UI/Menu";
import React from "react";
import Stock from "./Stock";
import TableauStacks from "./Tableau";
import Waste from "./Waste";

type BoardProps = { mode: string };
const Board = (props: BoardProps) => {
    const ref = React.useRef<HTMLDivElement>(null);
    return (
        <>
            <Menu />
            <Header mode={props.mode} />
            <ToastContainer
                style={{ zIndex: 8888 }}
                position="top-center"
                closeOnClick={false}
                newestOnTop={true}
                limit={1}
                pauseOnFocusLoss={false}
                draggable={false}
                transition={Slide}
            />
            <div className={"board-jail " + props.mode}>
                <div className={"board-grid-container " + props.mode}>
                    <Stock />
                    <Waste />
                    <div className="board-field spacer" ref={ref}>
                        {ref.current && <DndPreview reff={ref.current} />}
                    </div>
                    <FoundationStacks />
                    <TableauStacks />
                </div>
            </div>
            <Dealer />
            <BoardNavigator />
            <Judge />
        </>
    );
};

export default Board;
