import "../../Style/Screens.scss";
import "../../Style/Menu.css";

import { AppState, StartScreenState } from "../../../Common";

import Difficulty from "./Difficulty";
import DifficultyOptions from "./DifficultyOptions";
import MenuButton from "../Menu/MenuButton";
import MenuTitle from "../Menu/MenuTitle";
import { Provider } from "./Context";
import QuickStart from "./QuickStart";
import Rating from "./Rating";
import RatingPresets from "./RatingOptions";
import React from "react";
import TouchDetector from "./TouchDetector";
import VerticalMenu from "../Menu/VerticalMenu";

interface StartScreenProps {
    start: (settings: AppState) => void;
    initialState: AppState;
    autoConfig: boolean;
    title: string;
}

const StartScreen = (props: StartScreenProps) => {
    const [screen, setScreen] = React.useState<String>("");
    const getScreen = () => {
        switch (screen) {
            case "rating":
                return <Rating />;
            case "difficulty":
                return <Difficulty />;
            case "settings":
                return <QuickStart />;
            default:
                return null;
        }
    };
    const start = () => {
        const settings = {
            ...props.initialState,
            ...DifficultyOptions[state.difficultySettings].settings,
            ...state.ratingSettings,
            isTouch: state.isTouch,
        };
        props.start(settings);
    };
    const [state, setState] = React.useState<StartScreenState>({
        ratingSettings: { ...RatingPresets.all[1].settings },
        difficultySettings: 1,
        ratingPreset: 1,
        isTouch: TouchDetector(),
    });
    if (props.autoConfig) {
        start();
        return null;
    }
    return !props || !props.start ? null : (
        <Provider value={{ state, setState }}>
            <>
                <VerticalMenu>
                    <MenuTitle label={props.title} />
                    <MenuButton icon="🎲" title="Rating" onClick={() => setScreen("rating")} />
                    <MenuButton icon="⚙️" title="Difficulty" onClick={() => setScreen("difficulty")} />
                    <MenuButton icon="🏆" title="Settings" onClick={() => setScreen("settings")} />
                    <MenuButton icon="🎲" title="Start Game" onClick={start} blink={true} />
                </VerticalMenu>
                <div className="startscreen-layout">{getScreen()}</div>
            </>
        </Provider>
    );
};

export default StartScreen;
