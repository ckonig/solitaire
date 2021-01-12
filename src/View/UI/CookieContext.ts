import React from "react";

export interface ICookieContext {
    consented: boolean;
    setConsented: (c: boolean) => void;
}

const CookieContext = React.createContext<ICookieContext>({ consented: false, setConsented: () => {} });
export const CookieContextProvider = CookieContext.Provider;
const useCookieContext = () => React.useContext(CookieContext);
export default useCookieContext;
