import GlobalContext from "../Context";
import React from "react";
import ReactGamePad from "react-gamepad";

const GamePad = (props) => {
    const { state } = React.useContext(GlobalContext);
    const isGamePadDriven = state.settings.launchSettings.inputMode == "gamepad";
    const isSinglePlayer = state.settings.launchSettings.mode === "singleplayer";
    const switchToGamePad = (ctx) => {
        ctx.focus.isKeyBoard(true);
        if (isSinglePlayer) {
            ctx.settings.mouseMode = "remain-on-stack";
            ctx.settings.launchSettings.inputMode = "gamepad";
        }
    };
    const buttonHandler = (e) => {
        if (e == "DPadLeft") {
            props.onLeft(switchToGamePad);
        }
        if (e == "DPadRight") {
            props.onRight(switchToGamePad);
        }
        if (e == "DPadUp") {
            props.onUp(switchToGamePad);
        }
        if (e == "DPadDown") {
            props.onDown(switchToGamePad);
        }
        if (e == "A") {
            props.onAction(switchToGamePad);
        }
        if (e == "B") {
            props.onCancel(switchToGamePad);
        }
        if (e == "X") {
            props.onHint(switchToGamePad);
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
    return isSinglePlayer || isGamePadDriven ? (
        <ReactGamePad gamepadIndex={0} onButtonDown={buttonHandler} onConnect={connectHandler} onDisconnect={disconnectHandler}>
            <span></span>
        </ReactGamePad>
    ) : null;
};

export default GamePad;
