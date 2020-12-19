import React from "react";

const StackBase = (props) => {
    let classname = "card-base socket";

    if (props.visible) {
        if (props.blink) {
            classname += " socket-blink";
        } else {
            classname += " socket-empty";
        }
    } else {
        classname += " socket-full";
    }

    if (props.suggested) {
        classname += " socket-suggested";
    }

    return (
        <button className={classname} onClick={() => props.onClick()} disabled={!props.visible}>
            {props.children}
        </button>
    );
};
export default StackBase;
