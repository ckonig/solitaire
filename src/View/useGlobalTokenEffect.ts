import React from "react";
import useGlobalContext from "./GlobalContext";

const useTokenEffect = (f: React.EffectCallback) => {
    const { state } = useGlobalContext();
    // this hook only runs when the token changes. intentionally.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return React.useEffect(f, [state.token]);
};

export default useTokenEffect;
