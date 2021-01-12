import { Universal, getKeyboardLayout } from "../../../common/KeyboardLayouts";

import { BoardContext } from "../BoardContext";
import { CustomInputProps } from "./CustomInputProps";
import GameModes from "../../../GameModes";
import GlobalContext from "../../Context";
import Keyboard from "../../../common/Keyboard";
import Model from "../../../Model/Model";
import React from "react";

const BoardKeyboard = (props: CustomInputProps) => {
    const { state } = React.useContext(GlobalContext);
    if (!state) return null;
    const { player } = React.useContext(BoardContext);
    const isKeyboardDriven = state.settings.launchSettings.inputMode === "keyboard";
    const isSinglePlayer = state.settings.launchSettings.boardMode === GameModes.SINGLEPLAYER;
    const layout = isSinglePlayer ? Universal : getKeyboardLayout(state.settings.launchSettings.players[player].inputLayout);

    const switchToKeyboard = (ctx: Model) => {
        ctx.focus.isKeyBoard(true);
        if (isSinglePlayer) {
            ctx.settings.launchSettings.inputMode = "keyboard";
        }
    };

    return isKeyboardDriven || isSinglePlayer ? (
        <Keyboard
            layout={layout}
            onLeft={() => props.onLeft(switchToKeyboard)}
            onRight={() => props.onRight(switchToKeyboard)}
            onUp={() => props.onUp(switchToKeyboard)}
            onDown={() => props.onDown(switchToKeyboard)}
            onAction={() => props.onAction(switchToKeyboard)}
            onCancel={() => props.onCancel(switchToKeyboard)}
            onHint={() => props.onHint(switchToKeyboard)}
            onUndo={() => props.onUndo()}
            onPause={() => props.onPause(switchToKeyboard)}
            onMenu={() => props.onMenu(switchToKeyboard)}
        />
    ) : null;
};

export default BoardKeyboard;
