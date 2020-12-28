import React from "react";
import { EntropySettings, RatingSettings } from "../../../Common";
import SuggestionModes from "../../../Model/Game/Settings/SuggestionModes";
import RatingPresets from "./RatingOptions";
import TouchDetector from "./TouchDetector";

export interface IStartScreenContext {
    state: StartScreenState;
    setState: (s: StartScreenState) => void;
}
export const defaultStartScreenState= {
    ratingSettings: { ...RatingPresets.all[1].settings },
    difficultySettings: 1,
    ratingPreset: 1,
    quickDeal: TouchDetector(),
    entropySettings: {
        baseEntropy: TouchDetector() ? 1 : 2,
        interactionEntropy: TouchDetector() ? 1 : 2,
    },
    menu: {
        x: 0,
        y: 0,
    },
    screen: {
        x: 0,
        y: 0,
    },
    focus: "menu",
    screeen: "",
    mainMenu: "",
    suggestionMode: SuggestionModes.REGULAR,
}

export interface StartScreenState {
    ratingSettings: RatingSettings;
    difficultySettings: number;
    ratingPreset: number;
    quickDeal: boolean;
    entropySettings: EntropySettings;
    menu: {
        x: number;
        y: number;
    };
    screen: {
        x: number;
        y: number;
    };
    focus: string,
    mainMenu: string,
    screeen: string,
    suggestionMode: string,
}

const StartScreenContext = React.createContext<IStartScreenContext>({
    state: {
        difficultySettings: 0,
        ratingPreset: 0,
        ratingSettings: {},
        entropySettings: {},
        quickDeal: false,
        menu: {
            x: 0,
            y: 0,
        },
        screen: {
            x: 0,
            y: 0,
        },
        focus: "menu",
        mainMenu: "",
        screeen: "",
        suggestionMode: SuggestionModes.REGULAR,
    },
    setState: () => {},
});

export const Provider = StartScreenContext.Provider;
export default StartScreenContext;
