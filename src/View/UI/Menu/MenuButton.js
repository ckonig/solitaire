import React from "react";

const MenuButton = (props) => {
    let className = "";
    if (props.blink) {
        className += " blinking";
    }
    if (props.active) {
        className += " active";
    }
    
    return (
        <>
            <button className={className} title={props.title} onClick={props.onClick}>
                <div className="icon">{props.icon}</div>
                <div className="label">{props.title}</div>
            </button>
            <div className="submenu">{props.toggled ? props.children : null}</div>
        </>
    );
};
export default MenuButton;
