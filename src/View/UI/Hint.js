import GlobalContext from "../Context";
import React from "react";

const Hint = () => {
    const { state, handlers } = React.useContext(GlobalContext);
    const listenForH = (e) => {
        const evtobj = window.event ? event : e;
        if (evtobj.keyCode == 72) {
            handlers.suggestOnce();
        }
    };

    React.useEffect(() => {
        document.addEventListener("keydown", listenForH);
        return () => document.removeEventListener("keydown", listenForH);
    }, []);

    return state.settings.suggestionMode !== "none" ? null : (
        <div>
            <button title="Hint" onClick={() => handlers.suggestOnce()}>
                💡
            </button>
        </div>
    );
};
export default Hint;
