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

export interface ICookieContext {
    consented: boolean;
    setConsented: (c: boolean) => void;
}
export const CookieContext = React.createContext<ICookieContext>({ consented: false, setConsented: () => {} });
export const CookieContextProvider = CookieContext.Provider;
