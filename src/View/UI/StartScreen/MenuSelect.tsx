import React from "react";
import StartScreenContext from "./Context";
import { XY } from "./Tree";

type SelectItem = {
    label: string;
    id: string | number;
};

type SelectProps = {
    label: string;
    description: string;
    value: number;
    values: SelectItem[];
    callBack: (s: string, pos: XY) => void;
    x: number;
    y: number;
    hasFocus: boolean;
    disabled?: boolean;
};

const MenuSelect = (props: SelectProps) => {
    const inputEl = React.useRef<HTMLButtonElement>(null);
    React.useEffect(() => {
        if (props.hasFocus && inputEl && inputEl.current && inputEl.current !== document.activeElement) {
            inputEl.current.focus();
        }
    }, [props.hasFocus, inputEl]);
    const { state, setState } = React.useContext(StartScreenContext);
    const increment = () =>
        props.callBack((props.value + 1 < props.values.length ? props.value + 1 : 0).toString(), { x: props.x, y: props.y });
    let className = "";
    if (props.hasFocus) {
        className += " focused";
    }
    if (props.disabled) {
        className += " disabled";
    }
    return (
        <div className={"togglecontainer" + className}>
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
