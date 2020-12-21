import React from "react";

const Keyboard = (props) => {
    const navListener = (e) => {
        const evtobj = window.event ? event : e;
        if (evtobj.keyCode == 27) {
            props.onCancel();
            e.preventDefault();
        }
        if (evtobj.keyCode == 37) {
            props.onLeft();
            e.preventDefault();
        }
        if (evtobj.keyCode == 39) {
            props.onRight();
            e.preventDefault();
        }
        if (evtobj.keyCode == 38) {
            props.onUp();
            e.preventDefault();
        }
        if (evtobj.keyCode == 40) {
            props.onDown();
            e.preventDefault();
        }
        if (evtobj.keyCode == 96) {
            props.onAction();
            e.preventDefault();
        }
        if (evtobj.keyCode == 90 && evtobj.ctrlKey) {
            props.onUndo();
            e.preventDefault();
        }
        if (evtobj.keyCode == 72) {
            props.onHint();
            e.preventDefault();
        }
        if (evtobj.keyCode == 80) {
            props.onPause();
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
