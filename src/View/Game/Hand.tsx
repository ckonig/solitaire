import Card from "./Card";
import GlobalContext from "../Context";
import { IStack } from "../../Model/Game/IStack";
import React from "react";

const Hand = (props: { parentModel: IStack; offsetTop?: number; offsetLeft?: number }) => {
    const { state } = React.useContext(GlobalContext);
    if (!state || !state.hand || props.parentModel.source !== state.hand.source) {
        return null;
    }

    return (
        <>
            {[
                state.hand &&
                    state.hand.stack &&
                    state.hand.stack.map((card, index) => (
                        <Card
                            key={index}
                            model={card}
                            offsetTop={(props.offsetTop || 0) + index * 24}
                            offsetLeft={props.offsetLeft}
                            zIndex={1000 + index * 20}
                            isSelected={true}
                        />
                    )),
            ]}
        </>
    );
};

export default Hand;
