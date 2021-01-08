import GlobalContext from "../../Context";
import Model from "../../../Model/Model";
import React from "react";

const Hint = () => {
    const { state, updateContext } = React.useContext(GlobalContext);
    if (!state) return null;
    const isVisible = (state: Model) => state.settings.suggestionMode.supportsHints || state.settings.suggestionMode.isTemporary;

    const isDisabled = (state: Model) => state.settings.suggestionMode.isTemporary;

    const suggestOnce = () =>
        updateContext((state) => {
            if (isVisible(state) && !isDisabled(state)) {
                state.settings.enableHint();
            }
        });

    return !isVisible(state) ? null : (
        <div>
            <button title="Hint" onClick={() => suggestOnce()} disabled={isDisabled(state)}>
                <span className="icon">💡</span>
            </button>
        </div>
    );
};
export default Hint;
