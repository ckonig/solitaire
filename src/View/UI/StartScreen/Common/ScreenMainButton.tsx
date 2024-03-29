import Icon from "@mdi/react";
import React from "react";
import { XY } from "../../XY";
import useNavigationContext from "../Navigation/NavigationContext";

interface ScreenMainButtonProps {
    x?: number;
    y?: number;
    id: number;
    icon: string;
    className: (pos: XY) => string;
    lines: string[];
    onClick: () => void;
    autoFocus: boolean;
    disabled?: boolean;
}
const ScreenMainButton = (props: ScreenMainButtonProps) => {
    const inputEl = React.useRef<HTMLButtonElement>(null);
    const { navigation, setNavigation } = useNavigationContext();
    const hasFocus = navigation.focus === "screen" && navigation.screen.x === props.x && navigation.screen.y === props.y;
    React.useEffect(() => {
        if (hasFocus && inputEl && inputEl.current && inputEl.current !== document.activeElement) {
            inputEl.current.focus();
        }
    }, [inputEl, hasFocus]);

    React.useEffect(() => {
        if (
            props.autoFocus &&
            !hasFocus &&
            inputEl &&
            inputEl.current &&
            inputEl.current !== document.activeElement &&
            navigation.screen.x === -1 &&
            navigation.screen.y === -1
        ) {
            inputEl.current.focus();
        }
    // limited dependencies are on purpose to trigger this only once
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputEl]);
    const focus = () => {
        if (!hasFocus) {
            setNavigation({ ...navigation, screen: { x: props.x || 0, y: props.y || 0 } });
        }
    };
    const click = () => {
        props.onClick();
        setNavigation({ ...navigation, screen: { x: props.x || 0, y: props.y || 0 } });
    };

    if (typeof props.x === "undefined" || typeof props.y === "undefined") {
        return null;
    }

    const pos = { x: props.x, y: props.y };

    return (
        <button onFocus={focus} ref={inputEl} key={props.id} disabled={props.disabled} className={props.className(pos)} onClick={click}>
            <Icon path={props.icon} size="1em" />
            {props.lines.map((line: string, index: number) => (
                <div key={index}>{line}</div>
            ))}
        </button>
    );
};

export default ScreenMainButton;
