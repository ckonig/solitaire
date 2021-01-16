import CardModel from "../../Model/Deck/Card";
import Firework from "./Firework";
import React from "react";
import useGlobalContext from "../GlobalContext";

const CardFirework = (props: { model: CardModel }) => {
    const { state, updateContext } = useGlobalContext();

    React.useEffect(() => {
        if (props.model.success) {
            const timeout = setTimeout(() => updateContext((ctx) => ctx.clearSuccess(props.model)));
            return () => clearTimeout(timeout);
        }
    }, [state?.token, props.model, updateContext, props.model.success]);
    return <Firework intensity={props.model.success} />;
};

export default CardFirework;
