import GlobalContext from "../Context";
import React from "react";

const Navigator = () => {
    const { state, updateContext, updateGameContext } = React.useContext(GlobalContext);
    const isKeyboardDriven = state.settings.launchSettings.inputMode === "keyboard";
    const isSinglePlayer = state.settings.launchSettings.mode === "singleplayer";
    const before = { x: state.navigator.currentIndex.x, y: state.navigator.currentIndex.y, z: state.navigator.currentIndex.z };
    const switchToKeyboard = (ctx) => {
        state.focus.isKeyBoard(true);
        if (isSinglePlayer) {
            ctx.settings.mouseMode = "remain-on-stack";
            state.settings.launchSettings.inputMode = "keyboard";
        }
    };
    const navListener = (e) => {
        const evtobj = window.event ? event : e;
        if (evtobj.keyCode == 37) {
            updateContext((ctx) => {
                switchToKeyboard(ctx);
                ctx.navigator.moveLeft(before);
            });
            e.preventDefault();
        }
        if (evtobj.keyCode == 39) {
            updateContext((ctx) => {
                switchToKeyboard(ctx);
                ctx.navigator.moveRight(before);
            });
            e.preventDefault();
        }
        if (evtobj.keyCode == 38) {
            updateContext((ctx) => {
                switchToKeyboard(ctx);
                ctx.navigator.moveUp(before);
            });
            e.preventDefault();
        }
        if (evtobj.keyCode == 40) {
            updateContext((ctx) => {
                switchToKeyboard(ctx);
                ctx.navigator.moveDown(before);
            });
            e.preventDefault();
        }
        if (evtobj.keyCode == 96) {
            updateGameContext((context) => {
                state.navigator.pressCurrent()(context);
                switchToKeyboard(context, isSinglePlayer);
                //@hack: we need updateGameContext for UNDO but if there is not focus yet, this is not a business action
                context.game.timemachine.modified = true;
            });
        }
    };
    React.useEffect(() => {
        if (isKeyboardDriven || isSinglePlayer) {
            document.addEventListener("keydown", navListener);
            return () => {
                document.removeEventListener("keydown", navListener);
            };
        }
    }, [before, isKeyboardDriven, isSinglePlayer]);
    return null;
};

export default Navigator;
