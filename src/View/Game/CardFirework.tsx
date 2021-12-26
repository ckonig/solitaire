import CardModel from "../../Model/Deck/Card";
import Firework from "./Firework";
import React from "react";
import useGlobalContext from "../GlobalContext";

const CardFirework = (props: { model: CardModel }) => {
    const { state, updateContext } = useGlobalContext();

    React.useEffect(() => {
        if (props.model.success && state.settings.featureSwitches.confetti) {
            const timeout = setTimeout(() => updateContext((ctx) => ctx.clearSuccess(props.model)));
            return () => clearTimeout(timeout);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.model.success]);
    if (!state.settings.featureSwitches.confetti) {
        return null;
    }
    return <Firework intensity={props.model.success} />;
};

export default CardFirework;
