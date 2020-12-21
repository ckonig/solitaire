import React from "react";
import ReactGamePad from "react-gamepad";

const GamePad = (props) => {
    const buttonHandler = (e) => {
        if (e == "DPadLeft") {
            props.onLeft();
        }
        if (e == "DPadRight") {
            props.onRight();
        }
        if (e == "DPadUp") {
            props.onUp();
        }
        if (e == "DPadDown") {
            props.onDown();
        }
        if (e == "A") {
            props.onAction();
        }
        if (e == "B") {
            props.onCancel();
        }
        if (e == "X") {
            props.onHint();
        }
        if (e == "Y") {
            props.onUndo();
        }
    };
    const connectHandler = (e) => {
        console.debug("connected", e);
    };
    const disconnectHandler = (e) => {
        console.debug("disconnected", e);
    };

    //@todo pick ID of gamepad dynamically
    //allow switching PS4 and XBOX layouts
    //also support splitscreen battle mode
    return (
        <ReactGamePad gamepadIndex={props.gamepadIndex} onButtonDown={buttonHandler} onConnect={connectHandler} onDisconnect={disconnectHandler}>
            <span></span>
        </ReactGamePad>
    );
};

export default GamePad;
