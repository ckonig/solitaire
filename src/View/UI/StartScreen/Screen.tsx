import Controls from "./Controls";
import Difficulty from "./Difficulty";
import QuickStart from "./QuickStart";
import Rating from "./Rating";
import React from "react";

const Screen = (props: { screen: string }) => {
    const getScreen = () => {
        switch (props.screen) {
            case "rating":
                return <Rating  />;
            case "difficulty":
                return <Difficulty  />;
            case "settings":
                return <QuickStart />;
            case "controls":
                return <Controls />;
            default:
                return null;
        }
    };

    return props.screen ? (
        <div className="startscreen-layout">
            <div className="startscreen-jail">
                {getScreen()}
            </div>
        </div>
    ) : null;
};

export default Screen;
