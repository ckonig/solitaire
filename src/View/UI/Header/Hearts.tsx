import React from "react";
import useGlobalContext from "../../GlobalContext";

const Hearts = () => {
    const { state } = useGlobalContext();
    const getHearts = () => {
        if (state.settings.launchSettings.recyclingMode == "infinite") {
            return "🖤";
        }

        if (state.settings.launchSettings.recyclingMode == "1-pass") {
            return state.stock.passes > 0 ? "❤️" : "💔";
        }

        if (state.settings.launchSettings.recyclingMode == "3-pass") {
            const createString = (length: number, icon: string) =>
                Array.from(new Array(length).keys())
                    .map(() => icon)
                    .join("");

            return createString(state.stock.passes, "❤️") + createString(3 - state.stock.passes, "💔");
        }
        return null;
    };
    return <div className="heart-container">{getHearts()}</div>;
};
export default Hearts;
