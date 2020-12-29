import Toggle from "react-toggle";
import "../../../Style/react-toggle.css";
import React from "react";
import StartScreenContext from "../Context";
import { XY } from "../Menu/Tree";
import { getMenuClassName, useFocusEffect } from "./MenuElement";

interface StaticMenuToggleProps {
    value: boolean;
    label: string;
    description: string;
    disabled?: boolean;
    callBack: (s: boolean, pos: XY) => void;
}

interface ToggleProps extends StaticMenuToggleProps {
    x: number;
    y: number;
    hasFocus: boolean;
}

interface _MenuToggleProps extends StaticMenuToggleProps {
    x?: number;
    y?: number;
}

const _MenuToggle = (props: ToggleProps) => {
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

const MenuToggle = (props: _MenuToggleProps) => {
    if (typeof props.x == "undefined" || typeof props.y == "undefined") {
        return null;
    }
    const { state } = React.useContext(StartScreenContext);
    const hasFocus = (y: number, x: number) => state.focus == "screen" && state.screen.x == x && state.screen.y == y;
    const pos = { x: props.x || 0, y: props.y || 0 };
    return (
        <_MenuToggle
            x={pos.x}
            y={pos.y}
            disabled={!!props.disabled}
            hasFocus={hasFocus(pos.y, pos.x)}
            label={props.label}
            description={props.description}
            value={props.value}
            callBack={props.callBack}
        />
    );
};

export default MenuToggle;
