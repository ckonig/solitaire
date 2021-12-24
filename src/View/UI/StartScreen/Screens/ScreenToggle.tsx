import "./react-toggle.css";

import { getScreenElementClassName, useFocusEffect, useInitialFocus } from "./ScreenElement";

import Icon from "@mdi/react";
import React from "react";
import Toggle from "react-toggle";
import { XY } from "../../XY";
import useNavigationContext from "../NavigationContext";

interface StaticScreenToggleProps {
    value: boolean;
    label: string;
    icon: string;
    description: string;
    disabled?: boolean;
    callBack?: (s: boolean) => void;
    autoFocus?: boolean;
}

interface ToggleProps extends StaticScreenToggleProps {
    x: number;
    y: number;
    hasFocus: boolean;
}

interface _ScreenToggleProps extends StaticScreenToggleProps {
    x?: number;
    y?: number;
}

const RenderScreenToggle = (props: ToggleProps) => {
    const inputEl = React.useRef<HTMLButtonElement>(null);
    useFocusEffect(props, inputEl);
    const { navigation, setNavigation } = useNavigationContext();
    const change = (val: boolean, pos: XY) => {
        setNavigation({ ...navigation, screen: pos });
        props.callBack && props.callBack(val);
    };
    useInitialFocus(props, inputEl, navigation.screen);
    return (
        <div className={getScreenElementClassName("togglecontainer", props)}>
            <div className="title">{props.icon && <Icon size="0.8em" path={props.icon} />} {props.label}</div>
            <div className="toggle">
                <Toggle
                    ref={inputEl}
                    disabled={!!props.disabled}
                    autoFocus={props.autoFocus}
                    onFocus={() => {
                        if (!props.hasFocus) {
                            setNavigation({ ...navigation, screen: { x: props.x, y: props.y } });
                        }
                    }}
                    checked={props.value}
                    onChange={() => change(!props.value, { x: props.x, y: props.y })}
                />
            </div>
            <div className="description">{props.description}</div>
        </div>
    );
};

const ScreenToggle = (props: _ScreenToggleProps) => {
    const { navigation } = useNavigationContext();
    if (typeof props.x === "undefined" || typeof props.y === "undefined") {
        return null;
    }
    const hasFocus = (y: number, x: number) => navigation.focus === "screen" && navigation.screen.x === x && navigation.screen.y === y;
    const pos = { x: props.x || 0, y: props.y || 0 };
    return (
        <RenderScreenToggle
            x={pos.x}
            y={pos.y}
            icon={props.icon}
            disabled={!!props.disabled}
            hasFocus={hasFocus(pos.y, pos.x)}
            label={props.label}
            description={props.description}
            value={props.value}
            callBack={props.callBack}
            autoFocus={props.autoFocus}
        />
    );
};

export default ScreenToggle;
