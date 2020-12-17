import GlobalContext from "../Context";
import React from "react";

const Hint = () => {
    const { state, updateContext } = React.useContext(GlobalContext);
    const suggestOnce = () => {
        updateContext((state) => {
            const previous = state.settings.suggestionMode;
            state.settings.suggestionMode = "regular";
            state.suggest();
            state.settings.suggestionMode = previous;
        });
    };
    const listenForH = (e) => {
        const evtobj = window.event ? event : e;
        if (evtobj.keyCode == 72) {
            suggestOnce();
        }
    };

    React.useEffect(() => {
        document.addEventListener("keydown", listenForH);
        return () => document.removeEventListener("keydown", listenForH);
    }, []);

    return state.settings.suggestionMode !== "none" ? null : (
        <div>
            <button title="Hint" onClick={() => suggestOnce()}>
                💡
            </button>
        </div>
    );
};
export default Hint;
