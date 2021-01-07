import { EntropySettings, PlayerSettings, RatingSettings, defaultPlayerSettings } from "../../../Common";

import RatingPresets from "./RatingOptions";
import React from "react";
import SuggestionModes from "../../../Model/Game/Settings/SuggestionModes";
import TouchDetector from "./TouchDetector";

export interface IStartScreenContext {
    state: StartScreenState;
    setState: (s: StartScreenState) => void;
}

export const defaultStartScreenState: StartScreenState = {
    ratingSettings: { ...RatingPresets.REGULAR },
    difficultySettings: 1,
    ratingPreset: 1,
    quickDeal: TouchDetector(),
    entropySettings: {
        baseEntropy: TouchDetector() ? 1 : 2,
        interactionEntropy: TouchDetector() ? 1 : 2,
    },
    suggestionMode: SuggestionModes.REGULAR,
    players: defaultPlayerSettings,
};

export interface StartScreenState {
    ratingSettings: RatingSettings;
    difficultySettings: number;
    ratingPreset: number;
    quickDeal: boolean;
    entropySettings: EntropySettings;
    suggestionMode: string;
    players: PlayerSettings;
}

export interface NavigationState {
    menu: {
        x: number;
        y: number;
    };
    screen: {
        x: number;
        y: number;
    };
    focus: string;
    mainMenu: string;
    screeen: string;
}
interface INavigationContext {
    navigation: NavigationState;
    setNavigation: (n: NavigationState) => void;
}

export const NavigationContext = React.createContext<INavigationContext>({
    navigation: {
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
    },
    setNavigation: () => {},
});

const StartScreenContext = React.createContext<IStartScreenContext>({
    state: {
        difficultySettings: 0,
        ratingPreset: 0,
        ratingSettings: {},
        entropySettings: {},
        quickDeal: false,
        suggestionMode: SuggestionModes.REGULAR,
        players: defaultPlayerSettings,
    },
    setState: () => {},
});

export const Provider = StartScreenContext.Provider;
export const NavigationProvider = NavigationContext.Provider;
export default StartScreenContext;
