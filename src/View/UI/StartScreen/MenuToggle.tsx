import Toggle from "react-toggle";
import React from "react";
type ToggleProps = { label: string; description: string; value: boolean; callBack: (s: boolean) => void };
const MenuToggle = (props: ToggleProps) => {
    const cb = () => {
        props.callBack(!props.value);
    };
    return (
        <div className="togglecontainer">
            <div className="title">{props.label}</div>
            <div className="toggle">
                <Toggle checked={props.value} onChange={cb} />
            </div>
            <div className="description">{props.description}</div>
        </div>
    );
};

export default MenuToggle;
