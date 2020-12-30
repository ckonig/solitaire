import React from "react";
import { NavigationContext } from "../Context";
import { getScreenElementClassName, useFocusEffect } from "./ScreenElement";

export type SelectItem = {
    label: string;
    id: string | number;
};

interface StaticSelectProps {
    disabled?: boolean;
    value: number;
    values: SelectItem[];
    label: string;
    description: string;
    callBack: (s: string) => void;
}

interface SelectProps extends StaticSelectProps {
    x: number;
    y: number;
    hasFocus: boolean;
}

interface _ScreenSelectProps extends StaticSelectProps {
    x?: number;
    y?: number;
}

const _ScreenSelect = (props: SelectProps) => {
    const inputEl = React.useRef<HTMLButtonElement>(null);
    useFocusEffect(props, inputEl);
    const { navigation, setNavigation } = React.useContext(NavigationContext);

    return (
        <div className={getScreenElementClassName("togglecontainer", props)}>
            <div className="title">
                {props.label}: {props.values[props.value].label}
            </div>
            <div className="button">
                <button
                    ref={inputEl}
                    onClick={() => {
                        props.callBack((props.value + 1 < props.values.length ? props.value + 1 : 0).toString());
                        setNavigation({ ...navigation, screen: { x: props.x, y: props.y } });
                    }}
                    disabled={!!props.disabled}
                    onFocus={() => {
                        if (!props.hasFocus) {
                            setNavigation({ ...navigation, screen: { x: props.x, y: props.y } });
                        }
                    }}
                >
                    🔁
                </button>
            </div>
            <div className="description">{props.description}</div>
        </div>
    );
};

const ScreenSelect = (props: _ScreenSelectProps) => {
    if (typeof props.x == "undefined" || typeof props.y == "undefined") {
        return null;
    }
    const { navigation } = React.useContext(NavigationContext);
    const hasFocus = (y: number, x: number) => navigation.focus == "screen" && navigation.screen.x == x && navigation.screen.y == y;
    const pos = { x: props.x || 0, y: props.y || 0 };
    return (
        <_ScreenSelect
            x={pos.x}
            y={pos.y}
            disabled={!!props.disabled}
            hasFocus={hasFocus(pos.y, pos.x)}
            label={props.label}
            description={props.description}
            value={props.value}
            values={props.values}
            callBack={props.callBack}
        />
    );
};

export default ScreenSelect;
