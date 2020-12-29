import React from "react";
import { NavigationContext } from "../Context";
import { getMenuClassName, useFocusEffect } from "./MenuElement";
import { XY } from "../Menu/Tree";

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
    callBack: (s: string, pos: XY) => void;
}
interface SelectProps extends StaticSelectProps {
    x: number;
    y: number;
    hasFocus: boolean;
}
interface _MenuSelectProps extends StaticSelectProps {
    x?: number;
    y?: number;
}
const _MenuSelect = (props: SelectProps) => {
    const inputEl = React.useRef<HTMLButtonElement>(null);
    useFocusEffect(props, inputEl);
    const { navigation, setNavigation } = React.useContext(NavigationContext);
    const increment = () =>
        props.callBack((props.value + 1 < props.values.length ? props.value + 1 : 0).toString(), { x: props.x, y: props.y });

    return (
        <div className={"togglecontainer" + getMenuClassName(props)}>
            <div className="title">
                {props.label}: {props.values[props.value].label}
            </div>
            <div className="button">
                <button
                    ref={inputEl}
                    onClick={increment}
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

const MenuSelect = (props: _MenuSelectProps) => {
    if (typeof props.x == "undefined" || typeof props.y == "undefined") {
        return null;
    }
    const { navigation } = React.useContext(NavigationContext);
    const hasFocus = (y: number, x: number) => navigation.focus == "screen" && navigation.screen.x == x && navigation.screen.y == y;
    const pos = { x: props.x || 0, y: props.y || 0 };
    return (
        <_MenuSelect
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

export default MenuSelect;
