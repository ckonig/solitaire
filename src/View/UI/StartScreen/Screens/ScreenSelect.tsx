import { getScreenElementClassName, useFocusEffect } from "./ScreenElement";

import React from "react";
import useNavigationContext from "../NavigationContext";

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
    autoFocus?: boolean;
}

interface ScreenSelectProps extends StaticSelectProps {
    x: number;
    y: number;
    hasFocus: boolean;
}

interface _ScreenSelectProps extends StaticSelectProps {
    x?: number;
    y?: number;
}

const RenderScreenSelect = (props: ScreenSelectProps) => {
    const inputEl = React.useRef<HTMLButtonElement>(null);
    useFocusEffect(props, inputEl);
    const { navigation, setNavigation } = useNavigationContext();

    return (
        <div className={getScreenElementClassName("togglecontainer", props)}>
            <div className="title">
                {props.label}: {props.values[props.value].label}
            </div>
            <div className="button">
                <button
                    autoFocus={props.autoFocus}
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
    if (typeof props.x === "undefined" || typeof props.y === "undefined") {
        return null;
    }
    const { navigation } = useNavigationContext();
    const hasFocus = (y: number, x: number) => navigation.focus === "screen" && navigation.screen.x === x && navigation.screen.y === y;
    const pos = { x: props.x || 0, y: props.y || 0 };
    return (
        <RenderScreenSelect
            x={pos.x}
            y={pos.y}
            disabled={!!props.disabled}
            hasFocus={hasFocus(pos.y, pos.x)}
            label={props.label}
            description={props.description}
            value={props.value}
            values={props.values}
            callBack={props.callBack}
            autoFocus={props.autoFocus}
        />
    );
};

export default ScreenSelect;
