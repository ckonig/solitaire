import "./Board.scss";
import "react-toastify/dist/ReactToastify.min.css";

import { Slide, ToastContainer } from "react-toastify";

import Actors from "./Actors/Actors";
import DndPreview from "../../common/DndPreview";
import Foundation from "./Foundation";
import Header from "../UI/Header/Header";
import Menu from "../UI/Menu";
import React from "react";
import Stock from "./Stock";
import Tableau from "./Tableau";
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
                    <Foundation />
                    <Tableau />
                </div>
            </div>
            <Actors />
        </>
    );
};

export default Board;
