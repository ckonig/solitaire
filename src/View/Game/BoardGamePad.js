import { BoardContext } from "./BoardWrap";
import GameModes from "../../GameModes";
import GamePad from "./GamePad";
import GlobalContext from "../Context";
import React from "react";

const BoardGamePad = (props) => {
    const { state } = React.useContext(GlobalContext);
    const { player } = React.useContext(BoardContext);
    const isGamePadDriven = state.settings.launchSettings.inputMode == "gamepad";
    const isSinglePlayer = state.settings.launchSettings.boardMode === GameModes.SINGLEPLAYER;
    const switchToGamePad = (ctx) => {
        ctx.focus.isKeyBoard(true);
        if (isSinglePlayer) {
            ctx.settings.launchSettings.inputMode = "gamepad";
        }
    };

    return isSinglePlayer || isGamePadDriven ? (
        <GamePad
            gamepadIndex={state.settings.launchSettings.players[player].inputLayout}
            onLeft={() => props.onLeft && props.onLeft(switchToGamePad)}
            onRight={() => props.onRight && props.onRight(switchToGamePad)}
            onUp={() => props.onUp && props.onUp(switchToGamePad)}
            onDown={() => props.onDown && props.onDown(switchToGamePad)}
            onAction={() => props.onAction && props.onAction(switchToGamePad)}
            onCancel={() => props.onCancel && props.onCancel(switchToGamePad)}
            onHint={() => props.onHint && props.onHint(switchToGamePad)}
            onUndo={() => props.onUndo && props.onUndo()}
            onPause={() => props.onPause && props.onPause(switchToGamePad)}
            onMenu={() => props.onPause && props.onMenu(switchToGamePad)}
        >
            <span></span>
        </GamePad>
    ) : null;
};

export default BoardGamePad;
