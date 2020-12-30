import GlobalContext from "../Context";
import React from "react";
import Card from "./Card";

const Hand = (props) => {
    const { state } = React.useContext(GlobalContext);
    if (!state.hand || props.parentModel.source !== state.hand.source) {
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
                            offsetTop={props.offsetTop + index * 24}
                            offsetLeft={props.offsetLeft}
                            zIndex={1000 + index * 20}
                            isSelected={true}
                            onClick={(_c, p) => props.onClick(p)}
                        />
                    )),
            ]}
        </>
    );
};

export default Hand;
