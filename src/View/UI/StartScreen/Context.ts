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
        isTouch: false,
    },
    setState: () => {},
});

export const Provider = StartScreenContext.Provider;
export default StartScreenContext;
