import React from "react";
import { StartScreenState } from "../../../Common";

export interface IStartScreenContext {
    state: StartScreenState;
    setState: (s: StartScreenState) => void;
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
        focus: "menu"
    },
    setState: () => {},
});

export const Provider = StartScreenContext.Provider;
export default StartScreenContext;
