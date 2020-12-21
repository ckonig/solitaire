import GlobalContext from "../Context";
import MouseHand from "./MouseHand";
import React from "react";
import TouchHand from "./TouchHand";

const Hand = (props) => {
    const { state, updateGameContext } = React.useContext(GlobalContext);
    if (!state.hand || props.parentModel.source !== state.hand.source) {
        return null;
    }
    const putBack = (p) => {
        if (props.parentModel.stack.length) {
            updateGameContext(props.parentModel.getTop().onClick(p));
        } else {
            updateGameContext(props.parentModel.clickEmpty(p));
        }
    };
    if (state.settings.mouseMode == "follow-cursor") {
        return <MouseHand parent={props.parentModel.source} hand={state.hand} offsetTop={props.offsetTop} putBack={putBack} />;
    }
    if (state.settings.mouseMode == "remain-on-stack") {
        return (
            <>
                <TouchHand
                    parentModel={props.parentModel}
                    hand={state.hand}
                    offsetTop={props.offsetTop}
                    offsetLeft={props.offsetLeft}
                />
            </>
        );
    } else {
        return null;
    }
};

export default Hand;
