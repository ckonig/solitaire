import GlobalContext from "../Context";
import { IStack } from "../../Model/Game/IStack";
import Model from "../../Model/Model";
import React from "react";

type _selector = (model: Model) => IStack;

const useBlinkEffect = (selector: _selector) => {
    const { updateContext, state } = React.useContext(GlobalContext);
    if (!state) return;
    const model = selector(state);
    let timeout: any = null;
    React.useEffect(() => {
        if (state && selector(state).blinkFor) {
            timeout = setTimeout(
                () =>
                    updateContext((state: Model) => {
                        selector(state).unblink(state);
                    }),
                200
            );
        }
        return () => {
            clearTimeout(timeout);
        };
    }, [state, model.blinkFor]);
};

export default useBlinkEffect;
