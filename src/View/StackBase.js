import React from "react";

export default function StackBase(props) {
    let classname = "card-base socket-empty";
    if (props.blink) {
        classname += " blink";
    }
    return (
        <div className={classname} onClick={() => props.onClick()}>
            {props.children}
        </div>
    );
}
