import React from "react";

export interface Focusable {
    hasFocus: boolean;
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
