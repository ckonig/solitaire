import GlobalContext from "../Context";
import React from "react";

const Hint = () => {
    const { state, updateContext } = React.useContext(GlobalContext);
    
    //@todo update
    
    const isVisible = (state) => state.settings.suggestionMode.supportsHints || state.settings.suggestionMode.isTemporary;
    const isDisabled = (state) => state.settings.suggestionMode.isTemporary;

    const suggestOnce = () => {
        updateContext((state) => {
            if (isVisible(state) && !isDisabled(state)) {
                state.settings.enableHint();
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
