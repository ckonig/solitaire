import React from "react";

export interface MenuElementProps {
    label: string;
    description: string;
    x: number;
    y: number;
    hasFocus: boolean;
}

export interface MenuInpputElementProps extends MenuElementProps {
    disabled?: boolean;
}

export const getMenuClassName = (props: MenuInpputElementProps) => {
    let className = "";
    if (props.hasFocus) {
        className += " focused";
    }
    if (props.disabled) {
        className += " disabled";
    }
    return className;
};

export const useFocusEffect =  (props: MenuInpputElementProps, inputEl: React.RefObject<HTMLElement>) => {
    React.useEffect(() => {
        if (props.hasFocus && inputEl && inputEl.current && inputEl.current !== document.activeElement) {
            inputEl.current.focus();
        }
    }, [props.hasFocus, inputEl]);
}
