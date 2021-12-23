import { CustomInputProps } from "./CustomInputProps";
import GameModes from "../../../GameModes";
import GamePad from "../../../common/GamePad";
import GamepadLayout from "../../../common/GamepadLayout";
import Model from "../../../Model/Model";
import React from "react";
import { useBoardContext } from "../BoardContext";
import useGlobalContext from "../../GlobalContext";

const BoardGamePad = (props: CustomInputProps) => {
    const { state } = useGlobalContext();
    const { player } = useBoardContext();
    const isGamePadDriven = state.settings.launchSettings.players[player].inputMethod === "gamepad";
    const isSinglePlayer = state.settings.launchSettings.boardMode === GameModes.SINGLEPLAYER;

    const switchToGamePad = (ctx: Model) => {
        ctx.focus.isKeyBoard(true);
        if (isSinglePlayer) {
            ctx.settings.launchSettings.players[player].inputMethod = "gamepad";
        }
    };

    return isSinglePlayer || isGamePadDriven ? (
        <GamePad
            layout={GamepadLayout}
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
