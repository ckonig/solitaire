import GlobalContext from "../Context";
import React from "react";

const Navigator = () => {
    const { state, updateContext } = React.useContext(GlobalContext);
    const before = { x: state.navigator.currentIndex.x, y: state.navigator.currentIndex.y };
    const navListener = (e) => {
        const evtobj = window.event ? event : e;
        if (evtobj.keyCode == 37) {
            updateContext((ctx) => {
                ctx.settings.mouseMode = "remain-on-stack";
                ctx.navigator.moveLeft(before);
            });
            e.preventDefault();
        }
        if (evtobj.keyCode == 39) {
            updateContext((ctx) => {
                ctx.settings.mouseMode = "remain-on-stack";
                ctx.navigator.moveRight(before);
            });
            e.preventDefault();
        }
        if (evtobj.keyCode == 38) {
            updateContext((ctx) => {
                ctx.settings.mouseMode = "remain-on-stack";
                ctx.navigator.moveUp(before);
            });
            e.preventDefault();
        }
        if (evtobj.keyCode == 40) {
            updateContext((ctx) => {
                ctx.settings.mouseMode = "remain-on-stack";
                ctx.navigator.moveDown(before);
            });
            e.preventDefault();
        }
    };
    React.useEffect(() => {
        document.addEventListener("keydown", navListener);
        return () => {
            document.removeEventListener("keydown", navListener);
        };
    }, [before]);
    return null;
};

export default Navigator;
