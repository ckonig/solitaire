import GlobalContext from "../Context";
import React from "react";

const HeartContainer = () => {
    const { state } = React.useContext(GlobalContext);
    const getHearts = () => {
        if (state.settings.launchSettings.recyclingMode == "infinite") {
            return "🖤";
        }

        if (state.settings.launchSettings.recyclingMode == "1-pass") {
            return state.game.passes > 0 ? "❤️" : "💔";
        }

        if (state.settings.launchSettings.recyclingMode == "3-pass") {
            const createString = (length, icon) =>
                Array.from(new Array(length).keys())
                    .map(() => icon)
                    .join("");

            return createString(state.game.passes, "❤️") + createString(3 - state.game.passes, "💔");
        }
        return null;
    };
    return <div className="heart-container">{getHearts()}</div>;
};
export default HeartContainer;
