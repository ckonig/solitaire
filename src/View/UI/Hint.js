import GlobalContext from "../Context";
import React from "react";

const Hint = () => {
    const context = React.useContext(GlobalContext);
    const listenForH = (e) => {
        const evtobj = window.event ? event : e;
        if (evtobj.keyCode == 72) {
            context.handlers.suggestOnce();
        }
    };

    React.useEffect(() => {
        document.addEventListener("keydown", listenForH);
        return () => document.removeEventListener("keydown", listenForH);
    }, []);

    return context.state.settings.suggestionMode !== "none" ? null : (
        <div>
            <button title="Hint" onClick={() => context.handlers.suggestOnce()}>
                💡
            </button>
        </div>
    );
};
export default Hint;
