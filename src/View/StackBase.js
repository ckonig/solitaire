import React from "react";

const StackBase = (props) => {
    let classname = "card-base";

    if (props.visible) {
        if (props.blink) {
            classname += " socket-blink";
        } else {
            classname += " socket-empty";
        }
    } else {
        classname += " socket-full";
    }
    return (
        <div className={classname} onClick={() => props.onClick()}>
            {props.children}
        </div>
    );
};
export default StackBase;
