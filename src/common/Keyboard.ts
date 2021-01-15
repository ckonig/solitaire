import { InputProps } from "./InputProps";
import KeyboardLayout from "./KeyboardLayouts";
import React from "react";

interface KeyboardProps extends InputProps {
    layout: KeyboardLayout;
}
const Keyboard = (props: KeyboardProps) => {
    React.useEffect(() => {
        const navListener = (e: any) => {
            // eslint-disable-next-line no-restricted-globals
            const evtobj = window.event ? event : e;
            const { layout } = props;
            if (layout.cancel(evtobj)) {
                props.onCancel && props.onCancel();
                e.preventDefault();
            }
            if (layout.left(evtobj)) {
                props.onLeft && props.onLeft();
                e.preventDefault();
            }
            if (layout.right(evtobj)) {
                props.onRight && props.onRight();
                e.preventDefault();
            }
            if (layout.up(evtobj)) {
                props.onUp && props.onUp();
                e.preventDefault();
            }
            if (layout.down(evtobj)) {
                props.onDown && props.onDown();
                e.preventDefault();
            }
            if (layout.action(evtobj)) {
                props.onAction && props.onAction();
                e.preventDefault();
            }
            if (layout.undo(evtobj)) {
                props.onUndo && props.onUndo();
                e.preventDefault();
            }
            if (layout.hint(evtobj)) {
                props.onHint && props.onHint();
                e.preventDefault();
            }
            if (layout.pause(evtobj)) {
                props.onPause && props.onPause();
                e.preventDefault();
            }
            if (layout.menu(evtobj)) {
                props.onMenu && props.onMenu();
                e.preventDefault();
            }
        };
        document.addEventListener("keydown", navListener);
        return () => {
            document.removeEventListener("keydown", navListener);
        };
    }, [props]);
    return null;
};
export default Keyboard;
