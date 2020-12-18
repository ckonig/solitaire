import "../../Style/Screens.scss";
import "../../Style/Menu.css";

import { AppState, StartScreenState } from "../../../Common";

import Difficulty from "./Difficulty";
import DifficultyOptions from "./DifficultyOptions";
import { Provider } from "./Context";
import QuickStart from "./QuickStart";
import Rating from "./Rating";
import RatingPresets from "./RatingOptions";
import React from "react";

interface StartScreenProps {
    start: (settings: AppState) => void;
}

const StartScreen = (props: StartScreenProps) => {
    const start = () => {
        const settings = {
            ...DifficultyOptions[state.difficultySettings].settings,
            ...state.ratingSettings,
        };
        props.start(settings);
    };
    const [state, setState] = React.useState<StartScreenState>({
        ratingSettings: { ...RatingPresets.all[1].settings },
        difficultySettings: 1,
        ratingPreset: 1,
    });
    return !props || !props.start ? null : (
        <Provider value={{ state, setState }}>
            <div>
                <Rating />
                <Difficulty />
                <QuickStart start={start} />
            </div>
        </Provider>
    );
};

export default StartScreen;
