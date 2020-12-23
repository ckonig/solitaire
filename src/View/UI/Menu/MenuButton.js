import React from "react";
import StartScreenContext from "../StartScreen/Context";

const MenuButton = (props) => {
    let className = "";
    if (props.blink) {
        className += " blinking";
    }

    const { state } = React.useContext(StartScreenContext);

    if (props.y > 0) {
        className += " indented";
    }

    if (state.menu.x == props.x && state.menu.y == props.y && state.focus == "menu") {
        className += " highlight";
    }
    if (props.active || props.toggled) {
        className += " active";
    }

    return (
        <>
            <button className={className} title={props.title} onClick={props.onClick}>
                <div className="icon">{props.icon}</div>
                <div className="label">{props.title}</div>
            </button>
        </>
    );
};
export default MenuButton;
