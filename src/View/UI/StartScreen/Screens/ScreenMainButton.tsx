import React from "react";
import StartScreenContext from "../Context";
const ScreenMainButton = (props: {
    id: number;
    x: number;
    y: number;
    icon: string;
    className: string;
    lines: string[];
    hasFocus: boolean;
    onClick: () => void;
}) => {
    const inputEl = React.useRef<HTMLButtonElement>(null);
    //omg this is the worst but it works (5h lost)
    //const [isClicking, setClicking] = React.useState(false);
    React.useEffect(() => {
        if (props.hasFocus && inputEl && inputEl.current && inputEl.current !== document.activeElement) {
            inputEl.current.focus();
        }
    }, [props.hasFocus, inputEl]);
    const { state, setState } = React.useContext(StartScreenContext);
    const focus = () => {
        if (!props.hasFocus) {
            setState({ ...state, screen: { x: props.x, y: props.y } });
            //setClicking(false);
        }
    };
    return (
        <button
            onFocus={focus}
            ref={inputEl}
            key={props.id}
            className={props.className}
            //onMouseDown={() => setClicking(true)}
            onClick={props.onClick}
        >
            {props.icon}
            {props.lines.map((line: string, index: number) => (
                <div key={index}>{line}</div>
            ))}
        </button>
    );
};

export default ScreenMainButton;
