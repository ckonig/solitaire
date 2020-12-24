import Controls from "./Controls";
import Difficulty from "./Difficulty";
import { GameMode } from "../../GameModes";
import QuickStart from "./QuickStart";
import Rating from "./Rating";
import React from "react";

const Screen = (props: { screen: string; mainMenu: GameMode }) => {
    const getScreen = () => {
        switch (props.screen) {
            case "rating":
                return <Rating head={props.mainMenu.title} />;
            case "difficulty":
                return <Difficulty head={props.mainMenu.title} />;
            case "settings":
                return <QuickStart head={props.mainMenu.title} />;
            case "controls":
                return <Controls head={props.mainMenu.title} />;
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
