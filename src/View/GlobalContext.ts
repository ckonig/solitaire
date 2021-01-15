import { StateReplaceFunction, StateUpdateFunction } from "../Common";

import Model from "../Model/Model";
import React from "react";

interface IGlobalContext {
    state: Model | null;
    replaceContext: StateReplaceFunction;
    updateContext: StateUpdateFunction;
    updateGameContext: StateUpdateFunction;
    restart: () => void;
}

interface XGlobalContext {
    state: Model;
    replaceContext: StateReplaceFunction;
    updateContext: StateUpdateFunction;
    updateGameContext: StateUpdateFunction;
    restart: () => void;
}

const useGlobalContext: () => XGlobalContext = () => {
    const ctx = React.useContext(GlobalContext);
    if (!ctx.state) {
        throw new Error("no state present");
    }
    return { ...ctx, state: ctx.state };
};

const defaultValue = {
    state: null,
    replaceContext: () => {},
    updateContext: () => {},
    updateGameContext: () => {},
    restart: () => {},
};

const GlobalContext = React.createContext<IGlobalContext>(defaultValue);

export const Provider = GlobalContext.Provider;

export default useGlobalContext;
