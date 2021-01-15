import CardModel from "../../Model/Deck/Card";
import Firework from "./Firework";
import React from "react";
import useGlobalContext from "../GlobalContext";

const CardFirework = (props: { model: CardModel }) => {
    const { state, updateContext } = useGlobalContext();
    const [fire, setFire] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (props.model.success) {
            setFire(true);
            const timeout = setTimeout(() => updateContext((ctx) => ctx.clearSuccess(props.model)), 25);
            return () => clearTimeout(timeout);
        }
    }, [state?.token, props.model, updateContext, props.model.success]);
    return fire ? <Firework intensity={props.model.success} /> : null;
};

export default CardFirework;
