import { StateReplaceFunction, StateUpdateFunction } from "../Common";

import BusinessModel from "../Business/BusinessModel";
import React from "react";

interface IGlobalContext {
    state: BusinessModel | null;
    replaceContext: StateReplaceFunction;
    updateContext: StateUpdateFunction;
    updateGameContext: StateUpdateFunction;
    restart: () => void;
}

const defaultValue = {
    state: null,
    replaceContext: () => {},
    updateContext: () => {},
    updateGameContext: () => {},
    restart: () => {},
};

const GlobalContext = React.createContext<IGlobalContext>(defaultValue);

export const Provider = GlobalContext.Provider;

export default GlobalContext;
