import GlobalContext from "../Context";
import React from "react";

const Keyboard = (props) => {
    const { state } = React.useContext(GlobalContext);
    const isKeyboardDriven = state.settings.launchSettings.inputMode === "keyboard";
    const isSinglePlayer = state.settings.launchSettings.mode === "singleplayer";

    const switchToKeyboard = (ctx) => {
        ctx.focus.isKeyBoard(true);
        if (isSinglePlayer) {
            ctx.settings.mouseMode = "remain-on-stack";
            ctx.settings.launchSettings.inputMode = "keyboard";
        }
    };
    const navListener = (e) => {
        const evtobj = window.event ? event : e;
        if (evtobj.keyCode == 27) {
            props.onCancel(switchToKeyboard);
            e.preventDefault();
        }
        if (evtobj.keyCode == 37) {
            props.onLeft(switchToKeyboard);
            e.preventDefault();
        }
        if (evtobj.keyCode == 39) {
            props.onRight(switchToKeyboard);
            e.preventDefault();
        }
        if (evtobj.keyCode == 38) {
            props.onUp(switchToKeyboard);
            e.preventDefault();
        }
        if (evtobj.keyCode == 40) {
            props.onDown(switchToKeyboard);
            e.preventDefault();
        }
        if (evtobj.keyCode == 96) {
            props.onAction(switchToKeyboard);
        }
        if (evtobj.keyCode == 90 && evtobj.ctrlKey) {
            props.onUndo();
        }
        if (evtobj.keyCode == 72) {
            props.onHint(switchToKeyboard);
        }
    };
    React.useEffect(() => {
        if (isKeyboardDriven || isSinglePlayer) {
            document.addEventListener("keydown", navListener);
            return () => {
                document.removeEventListener("keydown", navListener);
            };
        }
    }, [isKeyboardDriven, isSinglePlayer, props]);
    return null;
};
export default Keyboard;
