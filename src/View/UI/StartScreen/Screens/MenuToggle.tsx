import Toggle from "react-toggle";
import React from "react";
import StartScreenContext from "../Context";
import { XY } from "../Menu/Tree";
import { getMenuClassName, MenuInpputElementProps, useFocusEffect } from "./MenuElement";

interface ToggleProps extends MenuInpputElementProps {
    value: boolean;
    callBack: (s: boolean, pos: XY) => void;
}

const MenuToggle = (props: ToggleProps) => {
    const inputEl = React.useRef<HTMLButtonElement>(null);
    useFocusEffect(props, inputEl);
    const { state, setState } = React.useContext(StartScreenContext);
    return (
        <div className={"togglecontainer" + getMenuClassName(props)}>
            <div className="title">{props.label}</div>
            <div className="toggle">
                <Toggle
                    ref={inputEl}
                    disabled={!!props.disabled}
                    autoFocus={props.hasFocus}
                    onFocus={() => {
                        if (!props.hasFocus) {
                            setState({ ...state, screen: { x: props.x, y: props.y } });
                        }
                    }}
                    checked={props.value}
                    onChange={() => props.callBack(!props.value, { x: props.x, y: props.y })}
                />
            </div>
            <div className="description">{props.description}</div>
        </div>
    );
};

export default MenuToggle;
