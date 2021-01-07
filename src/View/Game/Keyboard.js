import React from "react";

const Keyboard = (props) => {
    const navListener = (e) => {
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
            props.onPause && props.onMenu();
            e.preventDefault();
        }
    };
    React.useEffect(() => {
        document.addEventListener("keydown", navListener);
        return () => {
            document.removeEventListener("keydown", navListener);
        };
    }, [props]);
    return null;
};
export default Keyboard;
