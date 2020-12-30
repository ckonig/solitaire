import React from "react";

const Keyboard = (props) => {
    const navListener = (e) => {
        const evtobj = window.event ? event : e;
        if (evtobj.keyCode == 27) {
            props.onCancel && props.onCancel();
            e.preventDefault();
        }
        if (evtobj.keyCode == 37) {
            props.onLeft && props.onLeft();
            e.preventDefault();
        }
        if (evtobj.keyCode == 39) {
            props.onRight && props.onRight();
            e.preventDefault();
        }
        if (evtobj.keyCode == 38) {
            props.onUp && props.onUp();
            e.preventDefault();
        }
        if (evtobj.keyCode == 40) {
            props.onDown && props.onDown();
            e.preventDefault();
        }
        if (evtobj.keyCode == 96) {
            props.onAction && props.onAction();
            e.preventDefault();
        }
        if (evtobj.keyCode == 90 && evtobj.ctrlKey) {
            props.onUndo && props.onUndo();
            e.preventDefault();
        }
        if (evtobj.keyCode == 72) {
            props.onHint && props.onHint();
            e.preventDefault();
        }
        if (evtobj.keyCode == 80) {
            props.onPause && props.onPause();
            e.preventDefault();
        }
        if (evtobj.keyCode == 77) {
            props.onPause && props.onMenu();
            e.preventDefault();
        }
    };
    React.useEffect(() => {
        console.debug('registered nav listener')
        document.addEventListener("keydown", navListener);
        return () => {
            document.removeEventListener("keydown", navListener);
            console.debug('un-registered nav listener')
        };
    }, [props.onPause]);
    return null;
};
export default Keyboard;
