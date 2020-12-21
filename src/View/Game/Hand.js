import GlobalContext from "../Context";
import MouseHand from "./MouseHand";
import React from "react";
import TouchHand from "./TouchHand";

const Hand = (props) => {
    const { state } = React.useContext(GlobalContext);
    if (!state.hand || props.parentModel.source !== state.hand.source) {
        return null;
    }
    const putBack = (c, p) => props.onClick(props.stack[props.stack.length - 1], p, props.stack.length - 1);
    if (state.settings.mouseMode == "follow-cursor") {
        return <MouseHand parent={props.parentModel.source} hand={state.hand} offsetTop={props.offsetTop} putBack={putBack} />;
    }
    if (state.settings.mouseMode == "remain-on-stack") {
        return (
            <TouchHand
                parentModel={props.parentModel}
                hand={state.hand}
                offsetTop={props.offsetTop}
                offsetLeft={props.offsetLeft}
                onClick={putBack}
            />
        );
    } else {
        return null;
    }
};

export default Hand;
