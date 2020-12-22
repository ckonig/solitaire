import React from "react";

const MenuButton = (props) => {
    let className = "";
    if (props.blink) {
        className += " blinking";
    }
    return (
        <button className={className} title={props.title} onClick={props.onClick}>
            <div className="icon">{props.icon}</div>
            <div className="label">{props.title}</div>
        </button>
    );
};
export default MenuButton;
