import BoardGamePad from "./Game/BoardGamePad";
import BoardKeyboard from "./Game/BoardKeyboard";
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
                onPause={props.onPause}
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
                onPause={props.onPause}
            />
        </>
    );
};

export default Navigator;
