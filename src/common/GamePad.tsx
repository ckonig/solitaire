import { IGamepadLayout } from "../common/GamepadLayout";
import { InputProps } from "./InputProps";
import React from "react";
import ReactGamePad from "react-gamepad";
import RenderAfter from "./RenderAfter";

interface GamePadProps extends InputProps {
    gamepadIndex?: number;
    layout: IGamepadLayout;
}
const GamePad = (props: GamePadProps) => {
    const { layout } = props;
    const handlers = {
        onButtonDown: (e: string) => {
            if (layout.cancel(e)) {
                props.onCancel && props.onCancel();
            }
            if (layout.left(e)) {
                props.onLeft && props.onLeft();
            }
            if (layout.right(e)) {
                props.onRight && props.onRight();
            }
            if (layout.up(e)) {
                props.onUp && props.onUp();
            }
            if (layout.down(e)) {
                props.onDown && props.onDown();
            }
            if (layout.action(e)) {
                props.onAction && props.onAction();
            }
            if (layout.undo(e)) {
                props.onUndo && props.onUndo();
            }
            if (layout.hint(e)) {
                props.onHint && props.onHint();
            }
            if (layout.pause(e)) {
                props.onPause && props.onPause();
            }
            if (layout.menu(e)) {
                props.onMenu && props.onMenu();
            }
        },

        onConnect: (e: number) => {
            console.debug("connected", e);
        },

        onDisconnect: (e: number) => {
            console.debug("disconnected", e);
        },
    };

    return (
        <RenderAfter delay={125}>
            <ReactGamePad gamepadIndex={props.gamepadIndex} {...handlers}>
                <React.Fragment />
            </ReactGamePad>
        </RenderAfter>
    );
};

export default GamePad;
