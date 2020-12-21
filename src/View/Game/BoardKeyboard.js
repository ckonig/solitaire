import GlobalContext from "../Context";
import Keyboard from "./Keyboard";
import React from "react";

const BoardKeyboard = (props) => {
    const { state } = React.useContext(GlobalContext);
    const isKeyboardDriven = state.settings.launchSettings.inputMode === "keyboard";
    const isSinglePlayer = state.settings.launchSettings.mode === "singleplayer";

    const switchToKeyboard = (ctx) => {
        ctx.focus.isKeyBoard(true);
        if (isSinglePlayer) {
            ctx.settings.mouseMode = "remain-on-stack";
            ctx.settings.launchSettings.inputMode = "keyboard";
        }
    };

    return isKeyboardDriven || isSinglePlayer ? (
        <Keyboard
            onLeft={() => props.onLeft(switchToKeyboard)}
            onRight={() => props.onRight(switchToKeyboard)}
            onUp={() => props.onUp(switchToKeyboard)}
            onDown={() => props.onDown(switchToKeyboard)}
            onAction={() => props.onAction(switchToKeyboard)}
            onCancel={() => props.onCancel(switchToKeyboard)}
            onHint={() => props.onHint(switchToKeyboard)}
            onUndo={() => props.onUndo()}
        />
    ) : null;
};

export default BoardKeyboard;
