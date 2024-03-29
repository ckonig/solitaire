import React from "react";
import { XY } from "../../XY";

export interface Focusable {
    hasFocus: boolean;
    autoFocus?: boolean;
}

export interface MenuInpputElementProps extends Focusable {
    disabled?: boolean;
}

export const getScreenElementClassName = (base: string, props: MenuInpputElementProps) => {
    let className = base;
    if (props.hasFocus) {
        className += " focused";
    }
    if (props.disabled) {
        className += " disabled";
    }
    return className;
};

export const useFocusEffect = (props: Focusable, inputEl: React.RefObject<HTMLElement>) => {
    React.useEffect(() => {
        if (props.hasFocus && inputEl && inputEl.current && inputEl.current !== document.activeElement) {
            inputEl.current.focus();
        }
    }, [props.hasFocus, inputEl]);
};

export const useInitialFocus = (props: Focusable, inputEl: React.RefObject<HTMLElement>, pos: XY) => {
    React.useEffect(() => {
        if (
            props.autoFocus &&
            !props.hasFocus &&
            inputEl &&
            inputEl.current &&
            inputEl.current !== document.activeElement &&
            pos.x === -1 &&
            pos.y === -1
        ) {
            inputEl.current.focus();
        }
        // this hooks only works once, when ref is assigned
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputEl]);
};
