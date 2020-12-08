import MouseHand from "./MouseHand";
import React from "react";
import TouchHand from "./TouchHand";

const Hand = (props) => {
    const putBack = () => props.onClick(props.stack[props.stack.length - 1], props.stack.length - 1);
    if (props.settings.mouseMode == "follow-cursor") {
        return (
            <MouseHand
                parent={props.parent}
                hand={props.model}
                offsetTop={props.offsetTop}
                onClick={(c) => props.onClick(c, props.parent)}
                putBack={putBack}
            />
        );
    }
    if (props.settings.mouseMode == "remain-on-stack") {
        return (
            <TouchHand
                parent={props.parent}
                hand={props.model}
                shadowOffsetX={props.shadowOffsetX}
                shadowOffsetY={props.shadowOffsetY}
                offsetTop={props.offsetTop}
                onClick={putBack}
                stack={props.stack}
            />
        );
    } else {
        return <div>unkown moouse</div>;
    }
};

export default Hand;
