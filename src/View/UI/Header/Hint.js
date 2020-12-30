import GlobalContext from "../../Context";
import React from "react";

const Hint = () => {
    const { state, updateContext } = React.useContext(GlobalContext);

    const isVisible = (state) => state.settings.suggestionMode.supportsHints || state.settings.suggestionMode.isTemporary;
    const isDisabled = (state) => state.settings.suggestionMode.isTemporary;

    const suggestOnce = () => {
        updateContext((state) => {
            if (isVisible(state) && !isDisabled(state)) {
                state.settings.enableHint();
            }
        });
    };

    return !isVisible(state) ? null : (
        <div>
            <button title="Hint" onClick={() => suggestOnce()} disabled={isDisabled(state)}>
                <span className="icon">💡</span> Hint
            </button>
        </div>
    );
};
export default Hint;
