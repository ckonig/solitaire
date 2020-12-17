import React from "react";

const HeartContainer = (props) => {
    const getHearts = () => {
        if (props.recyclingMode == "infinite") {
            return "🖤";
        }

        if (props.recyclingMode == "1-pass") {
            return props.passes > 0 ? "❤️" : "💔";
        }

        if (props.recyclingMode == "3-pass") {
            const createString = (length, icon) =>
                Array.from(new Array(length).keys())
                    .map(() => icon)
                    .join("");

            return createString(props.passes, "❤️") + createString(3 - props.passes, "💔");
        }
        return null;
    };
    return <div className="heart-container">{getHearts()}</div>;
};

export default HeartContainer;
