import { BoardContext } from "../BoardContext";
import { CustomInputProps } from "./CustomInputProps";
import GameModes from "../../../GameModes";
import GamePad from "../../../common/GamePad";
import GlobalContext from "../../Context";
import Model from "../../../Model/Model";
import React from "react";

const BoardGamePad = (props: CustomInputProps) => {
    const { state } = React.useContext(GlobalContext);
    if (!state) return null;
    const { player } = React.useContext(BoardContext);
    const isGamePadDriven = state.settings.launchSettings.inputMode == "gamepad";
    const isSinglePlayer = state.settings.launchSettings.boardMode === GameModes.SINGLEPLAYER;

    const switchToGamePad = (ctx: Model) => {
        ctx.focus.isKeyBoard(true);
        if (isSinglePlayer) {
            ctx.settings.launchSettings.inputMode = "gamepad";
        }
    };

    return isSinglePlayer || isGamePadDriven ? (
        <GamePad
            gamepadIndex={state.settings.launchSettings.players[player].inputLayout}
            onLeft={() => props.onLeft(switchToGamePad)}
            onRight={() => props.onRight(switchToGamePad)}
            onUp={() => props.onUp(switchToGamePad)}
            onDown={() => props.onDown(switchToGamePad)}
            onAction={() => props.onAction(switchToGamePad)}
            onCancel={() => props.onCancel(switchToGamePad)}
            onHint={() => props.onHint(switchToGamePad)}
            onUndo={() => props.onUndo()}
            onPause={() => props.onPause(switchToGamePad)}
            onMenu={() => props.onMenu(switchToGamePad)}
        />
    ) : null;
};

export default BoardGamePad;
