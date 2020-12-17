import GlobalState from "../Context";
import React from "react";

const HeartContainer = (props, context) => {
    const getHearts = () => {
        if (context.state.settings.launchSettings.recyclingMode == "infinite") {
            return "🖤";
        }

        if (context.state.settings.launchSettings.recyclingMode == "1-pass") {
            return props.passes > 0 ? "❤️" : "💔";
        }

        if (context.state.settings.launchSettings.recyclingMode == "3-pass") {
            const createString = (length, icon) =>
                Array.from(new Array(length).keys())
                    .map(() => icon)
                    .join("");

            return createString(context.state.game.passes, "❤️") + createString(3 - context.state.game.passes, "💔");
        }
        return null;
    };
    return <div className="heart-container">{getHearts()}</div>;
};
HeartContainer.contextTypes = GlobalState;
export default HeartContainer;
