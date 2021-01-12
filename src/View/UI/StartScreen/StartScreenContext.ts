import { EntropySettings, PlayerSettings, RatingSettings, defaultPlayerSettings } from "../../../Common";

import RatingPresets from "./RatingOptions";
import React from "react";
import SuggestionModes from "../../../Model/Game/Settings/SuggestionModes";
import TouchDetector from "../../../common/TouchDetector";

export interface IStartScreenContext {
    state: StartScreenState;
    setState: (s: StartScreenState) => void;
}

export const defaultStartScreenState: StartScreenState = {
    ratingSettings: { ...RatingPresets.REGULAR },
    difficultySettings: 1,
    ratingPreset: 1,
    quickDeal: TouchDetector(),
    autoResolve: true,
    autoUncover: false,
    speed: false,
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
    autoResolve: boolean;
    autoUncover: boolean;
    speed: boolean;
    entropySettings: EntropySettings;
    suggestionMode: string;
    players: PlayerSettings;
}

const StartScreenContext = React.createContext<IStartScreenContext>({
    state: {
        difficultySettings: 0,
        ratingPreset: 0,
        ratingSettings: {},
        entropySettings: {},
        quickDeal: false,
        autoResolve: true,
        autoUncover: false,
        speed: false,
        suggestionMode: SuggestionModes.REGULAR,
        players: defaultPlayerSettings,
    },
    setState: () => {},
});

export const StartScreenProvider = StartScreenContext.Provider;

const useStartScreenContext = () => React.useContext(StartScreenContext);

export default useStartScreenContext;
