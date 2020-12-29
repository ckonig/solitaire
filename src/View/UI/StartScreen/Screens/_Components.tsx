import StartScreenContext from "../Context";
import { XY } from "../Menu/Tree";
import { NavWrapper, ScreenNavigator } from "./Screen";
import React from "react";
import CookieBanner from "./CookieBanner";
import MenuToggle from "./MenuToggle";

export const _Screen = (props: { id: string, navigator: ScreenNavigator; children: any[] }) => {
    const navigator = new ScreenNavigator(props.id);
    props.navigator.rows = [];
    const addRow = (child: any, index: number) => {
        props.navigator.rows[index] = { buttons: [] };
        return React.cloneElement(child, { x: 0, y: index, navigator: props.navigator });
    };
    return (
        <div className="content">
            {props.children.map((child, index) => addRow(child, index))}
            <NavWrapper navigator={props.navigator} screen="rating" />
        </div>
    );
};

export const _Row = (props: { y?: number; navigator?: ScreenNavigator; children?: any[] | any | undefined }) => {
    if (typeof props.y == "undefined" || typeof props.navigator == "undefined") {
        return null;
    }
    const addElement = (child: any, index: number) => {
        const assign = (n: any[]) => {
            n[props.y || 0].buttons[index || 0] = { x: index, y: props.y };
        };
        assign(props.navigator?.rows || []);
        return React.cloneElement(child, { x: index, y: props.y });
    };
    return !props.children ? null : (
        <div className="row">{Array.isArray(props.children) ? props.children.map(addElement) : addElement(props.children, 0)}</div>
    );
};

export const _ScreenMainButton = (props: {
    x?: number;
    y?: number;
    hasFocus: (pos: XY) => boolean;
    id: number;
    icon: string;
    className: (pos: XY) => string;
    lines: string[];
    onClick: () => void;
    initialFocus: boolean;
}) => {
    if (typeof props.x == "undefined" || typeof props.y == "undefined") {
        return null;
    }
    const pos = { x: props.x, y: props.y };
    const inputEl = React.useRef<HTMLButtonElement>(null);
    React.useEffect(() => {
        if (props.hasFocus(pos) && inputEl && inputEl.current && inputEl.current !== document.activeElement) {
            console.debug("updating focus");
            inputEl.current.focus();
        }
    }, [props.hasFocus, pos, inputEl]);
    React.useEffect(() => {
        if (props.initialFocus && inputEl && inputEl.current && inputEl.current !== document.activeElement) {
            console.debug("setting initial focus");
            inputEl.current.focus();
        }
    }, [inputEl]);
    const { state, setState } = React.useContext(StartScreenContext);
    const focus = () => {
        console.debug("was focused");
        if (!props.hasFocus(pos)) {
            console.debug("update location");
            setState({ ...state, screen: { x: props.x || 0, y: props.y || 0 } });
        }
    };

    return (
        <button onFocus={focus} ref={inputEl} key={props.id} className={props.className(pos)} onClick={props.onClick}>
            {props.icon}
            {props.lines.map((line: string, index: number) => (
                <div key={index}>{line}</div>
            ))}
        </button>
    );
};
export const _CookieBanner = (props: { hasFocus: (pos: XY) => boolean; x?: number; y?: number }) => {
    if (typeof props.x == "undefined" || typeof props.y == "undefined") {
        return null;
    }
    const pos = { x: props.x || 0, y: props.y || 0 };
    return <CookieBanner hasFocus={props.hasFocus(pos)} />;
};

export const _MenuToggle = (props: {
    x?: number;
    y?: number;
    hasFocus: (pos: XY) => boolean;
    value: boolean;
    callBack: (s: boolean, pos: XY) => void;
    label: string;
    description: string;
}) => {
    if (typeof props.x == "undefined" || typeof props.y == "undefined") {
        return null;
    }
    const pos = { x: props.x || 0, y: props.y || 0 };
    return (
        <MenuToggle
            x={pos.x}
            y={pos.y}
            hasFocus={props.hasFocus(pos)}
            label={props.label}
            description={props.description}
            value={props.value}
            callBack={props.callBack}
        />
    );
};
