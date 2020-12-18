import GlobalContext from "../Context";
import React from "react";

const Hint = () => {
    const { state, updateContext } = React.useContext(GlobalContext);
    const isVisible = (state) => ["none", "twice", "once"].indexOf(state.settings.suggestionMode) !== -1;
    const isDisabled = (state) => ["twice", "once"].indexOf(state.settings.suggestionMode) !== -1;

    const suggestOnce = () => {
        updateContext((state) => {
            if (isVisible(state) && !isDisabled(state)) {
                state.settings.suggestionMode = state.settings.hintMode;
            }
        });
    };

    const listenForH = (e) => {
        const evtobj = window.event ? event : e;
        if (evtobj.keyCode == 72) {
            suggestOnce();
        }
    };

    if (isVisible(state) && !isDisabled(state)) {
        React.useEffect(() => {
            document.addEventListener("keydown", listenForH);
            return () => document.removeEventListener("keydown", listenForH);
        }, []);
    }

    return !isVisible(state) ? null : (
        <div>
            <button title="Hint" onClick={() => suggestOnce()} disabled={isDisabled(state)}>
                💡
            </button>
        </div>
    );
};
export default Hint;
