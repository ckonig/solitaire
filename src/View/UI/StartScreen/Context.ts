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
        x: 0,
        y:0 ,
    },
    setState: () => {},
});

export const Provider = StartScreenContext.Provider;
export default StartScreenContext;
