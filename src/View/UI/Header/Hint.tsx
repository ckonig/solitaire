import Icon from "@mdi/react";
import Model from "../../../Model/Model";
import React from "react";
import { mdiLightbulb } from "@mdi/js";
import useGlobalContext from "../../GlobalContext";

const Hint = () => {
    const { state, updateContext } = useGlobalContext();
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
                <span className="icon">
                    {" "}
                    <Icon path={mdiLightbulb} size=".9em" />
                </span>
            </button>
        </div>
    );
};
export default Hint;
