import React from "react";
import StartScreenContext from "../Context";
import { Focusable, useFocusEffect } from "./MenuElement";
interface ScreenMainButtonProps extends Focusable {
    id: number;
    icon: string;
    className: string;
    lines: string[];
    onClick: () => void;
}
const ScreenMainButton = (props: ScreenMainButtonProps) => {
    const inputEl = React.useRef<HTMLButtonElement>(null);
    useFocusEffect(props, inputEl);
    const { state, setState } = React.useContext(StartScreenContext);
    const focus = () => {
        if (!props.hasFocus) {
            setState({ ...state, screen: { x: props.x, y: props.y } });
        }
    };
    return (
        <button onFocus={focus} ref={inputEl} key={props.id} className={props.className} onClick={props.onClick}>
            {props.icon}
            {props.lines.map((line: string, index: number) => (
                <div key={index}>{line}</div>
            ))}
        </button>
    );
};

export default ScreenMainButton;
