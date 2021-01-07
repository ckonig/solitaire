import { Universal, getKeyboardLayout } from "./KeyboardLayouts";

import { BoardContext } from "./BoardWrap";
import GlobalContext from "../Context";
import Keyboard from "./Keyboard";
import React from "react";

const BoardKeyboard = (props) => {
    const { state } = React.useContext(GlobalContext);
    const { player } = React.useContext(BoardContext);
    const isKeyboardDriven = state.settings.launchSettings.inputMode === "keyboard";
    const isSinglePlayer = state.settings.launchSettings.boardMode === "singleplayer";
    const layout = isSinglePlayer ? Universal : getKeyboardLayout(state.settings.launchSettings.players[player].inputLayout);

    const switchToKeyboard = (ctx) => {
        ctx.focus.isKeyBoard(true);
        if (isSinglePlayer) {
            ctx.settings.launchSettings.inputMode = "keyboard";
        }
    };

    return isKeyboardDriven || isSinglePlayer ? (
        <Keyboard
            layout={layout}
            onLeft={() => props.onLeft && props.onLeft(switchToKeyboard)}
            onRight={() => props.onRight && props.onRight(switchToKeyboard)}
            onUp={() => props.onUp && props.onUp(switchToKeyboard)}
            onDown={() => props.onDown && props.onDown(switchToKeyboard)}
            onAction={() => props.onAction && props.onAction(switchToKeyboard)}
            onCancel={() => props.onCancel && props.onCancel(switchToKeyboard)}
            onHint={() => props.onHint && props.onHint(switchToKeyboard)}
            onUndo={() => props.onUndo && props.onUndo()}
            onPause={() => props.onPause && props.onPause(switchToKeyboard)}
            onMenu={() => props.onMenu && props.onMenu(switchToKeyboard)}
        />
    ) : null;
};

export default BoardKeyboard;
