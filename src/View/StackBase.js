import React from "react";

const StackBase = (props) => {
    let classname = "card-base socket-empty";
    if (props.blink) {
        classname += " blink";
    }
    if (props.visible) {
        classname += "socket-empty";
    }
    return (
        <div className={classname} onClick={() => props.onClick()}>
            {props.children}
        </div>
    );
};
export default StackBase;
