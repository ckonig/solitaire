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
            case "controls0":
                return <Controls player={0} />;
            case "controls1":
                return <Controls player={1} />;
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
