import React from "react";
import ReactGamePad from "react-gamepad";

const GamePad = (props) => {
    const buttonHandler = (e) => {
        console.debug(e);
        if (e == "DPadLeft") {
            props.onLeft && props.onLeft();
        }
        if (e == "DPadRight") {
            props.onRight && props.onRight();
        }
        if (e == "DPadUp") {
            props.onUp && props.onUp();
        }
        if (e == "DPadDown") {
            props.onDown && props.onDown();
        }
        if (e == "A") {
            props.onAction && props.onAction();
        }
        if (e == "B") {
            props.onCancel && props.onCancel();
        }
        if (e == "X") {
            props.onHint && props.onHint();
        }
        if (e == "Y") {
            props.onUndo && props.onUndo();
        }
        if (e == "Start") {
            props.onPause && props.onPause();
        }
        if (e == "Back") {
            props.onPause && props.onMenu();
        }
    };
    const connectHandler = (e) => {
        console.debug("connected", e);
    };
    const disconnectHandler = (e) => {
        console.debug("disconnected", e);
    };

    //@todo pick ID of gamepad dynamically?
    //allow switching PS4 and XBOX layouts
    return (
        <ReactGamePad
            gamepadIndex={props.gamepadIndex}
            onButtonDown={buttonHandler}
            onConnect={connectHandler}
            onDisconnect={disconnectHandler}
        >
            <span></span>
        </ReactGamePad>
    );
};

export default GamePad;
