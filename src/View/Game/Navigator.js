import BoardGamePad from "./BoardGamePad";
import BoardKeyboard from "./BoardKeyboard";
import React from "react";

const Navigator = (props) => {
    return (
        <>
            <BoardKeyboard
                onLeft={props.onLeft}
                onRight={props.onRight}
                onUp={props.onUp}
                onDown={props.onDown}
                onAction={props.onAction}
                onCancel={props.onCancel}
                onHint={props.onHint}
                onUndo={props.onUndo}
            />
            <BoardGamePad
                onLeft={props.onLeft}
                onRight={props.onRight}
                onUp={props.onUp}
                onDown={props.onDown}
                onAction={props.onAction}
                onCancel={props.onCancel}
                onHint={props.onHint}
                onUndo={props.onUndo}
            />
        </>
    );
};

export default Navigator;
