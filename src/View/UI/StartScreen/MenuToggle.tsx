import Toggle from "react-toggle";
import React from "react";
import StartScreenContext from "./Context";
import { XY } from "./Tree";
type ToggleProps = { label: string; description: string; value: boolean; callBack: (s: boolean, pos: XY) => void, x: number, y: number, hasFocus: boolean };
const MenuToggle = (props: ToggleProps) => {
    const inputEl = React.useRef<HTMLButtonElement>(null);
    React.useEffect(() => {
        if (props.hasFocus && inputEl && inputEl.current && inputEl.current !== document.activeElement) {
            inputEl.current.focus();
        }
    }, [props.hasFocus, inputEl]);
    const cb = () => {
        props.callBack(!props.value, { x: props.x, y: props.y });
    };
    const { state, setState } = React.useContext(StartScreenContext);
    const focus = () => {
        if (!props.hasFocus) {
            setState({ ...state, screen: { x: props.x, y: props.y } });
        }
    };
    let className="";
    if (props.hasFocus) {
        className += " focused"
    }
     //ref?: any;
    return (
        <div className={"togglecontainer"+className}>
            <div className="title">{props.label}</div>
            <div className="toggle">               
                <Toggle ref={inputEl} autoFocus={props.hasFocus} onFocus={focus} checked={props.value} onChange={cb} />
            </div>
            <div className="description">{props.description}</div>
        </div>
    );
};

export default MenuToggle;
