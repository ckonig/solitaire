import React from "react";
import StartScreenContext from "../Context";
import { XY } from "../Menu/Tree";

interface ScreenMainButtonProps {
    x?: number;
    y?: number;
    id: number;
    icon: string;
    className: (pos: XY) => string;
    lines: string[];
    onClick: () => void;
    initialFocus: boolean;
}
const ScreenMainButton = (props: ScreenMainButtonProps) => {
    if (typeof props.x == "undefined" || typeof props.y == "undefined") {
        return null;
    }

    const pos = { x: props.x, y: props.y };
    const inputEl = React.useRef<HTMLButtonElement>(null);
    const { state, setState } = React.useContext(StartScreenContext);
    const hasFocus = state.focus == "screen" && state.screen.x == props.x && state.screen.y == props.y;
    const [isClicking, setClicking] = React.useState<boolean>(false);
    React.useEffect(() => {
        if (hasFocus && !isClicking && inputEl && inputEl.current && inputEl.current !== document.activeElement) {
            inputEl.current.focus();
        }
    }, [inputEl]);

    React.useEffect(() => {
        if (
            props.initialFocus &&
            !hasFocus &&
            inputEl &&
            inputEl.current &&
            inputEl.current !== document.activeElement &&
            state.screen.x == -1 &&
            state.screen.y == -1
        ) {
            setClicking(true);
            inputEl.current.focus();
        }
    }, [inputEl]);
    const focus = () => {
        if (!hasFocus && !isClicking) {
            setState({ ...state, screen: { x: props.x || 0, y: props.y || 0 } });
            setClicking(false);
        }
    };

    return (
        <button
            onFocus={focus}
            ref={inputEl}
            key={props.id}
            className={props.className(pos)}
            onMouseDown={() => setClicking(true)}
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
