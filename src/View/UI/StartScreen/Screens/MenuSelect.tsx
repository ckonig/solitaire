import React from "react";
import StartScreenContext from "../Context";
import { getMenuClassName, MenuInpputElementProps, useFocusEffect } from "./MenuElement";
import { XY } from "../Menu/Tree";

type SelectItem = {
    label: string;
    id: string | number;
};

interface SelectProps extends MenuInpputElementProps {
    value: number;
    values: SelectItem[];
    callBack: (s: string, pos: XY) => void;
}

const MenuSelect = (props: SelectProps) => {
    const inputEl = React.useRef<HTMLButtonElement>(null);
    useFocusEffect(props, inputEl);
    const { state, setState } = React.useContext(StartScreenContext);
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
                            setState({ ...state, screen: { x: props.x, y: props.y } });
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

export default MenuSelect;
