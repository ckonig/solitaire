import { InputProps } from "./InputProps";
import React from "react";
import ReactGamePad from "react-gamepad";
import RenderAfter from "./RenderAfter";

interface GamePadProps extends InputProps {
    gamepadIndex?: number;
}
const GamePad = (props: GamePadProps) => {
    const handlers = {
        onButtonDown: (e: string) => {
            //@todo use layout abstraction like in keyboard
            //@todo make layouts configurable (for visuals allow switching PS4 and XBOX layouts)
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
                <span></span>
            </ReactGamePad>
        </RenderAfter>
    );
};

export default GamePad;
