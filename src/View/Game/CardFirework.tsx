import CardModel from "../../Model/Deck/Card";
import Firework from "./Firework";
import GlobalContext from "../Context";
import React from "react";

const CardFirework = (props: { model: CardModel }) => {
    const { state, updateContext } = React.useContext(GlobalContext);
    const [fire, setFire] = React.useState<boolean>(false);
    if (!state) return null;

    React.useEffect(() => {
        if (props.model.success) {
            setFire(true);
            const timeout = setTimeout(() => updateContext((ctx) => ctx.clearSuccess(props.model)), 25);
            return () => clearTimeout(timeout);
        }
    }, [state?.token, props.model.success]);
    return <>{fire && <Firework intensity={props.model.success} />}</>;
};

export default CardFirework;
