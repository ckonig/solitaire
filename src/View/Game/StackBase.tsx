import React, { MouseEventHandler, useCallback } from "react";

import { IStack } from "../../Model/Game/Stack";
import getStackLabel from "./StackDescription";
import useGlobalContext from "../GlobalContext";

const StackBase = (props: { model: IStack; children?: React.ReactNode }) => {
    const { state, updateGameContext } = useGlobalContext();
    
    const getClassName = useCallback(() => {
        let classname = "card-base socket";
        if (!props.model.stack.length) {
            if (props.model.blinkFor) {
                classname += " socket-blink";
            } else if (state.focus.hasStack(props.model.source)) {
                classname += " socket-focused";
            } else {
                classname += " socket-empty";
            }
        } else {
            classname += " socket-full";
        }

        if (props.model.suggestion && !props.model.stack.length) {
            classname += " socket-suggested";
        }
        return classname;
    }, [props.model.stack.length, props.model.suggestion, props.model.blinkFor, props.model.source, state.focus]);

    const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        const isKeyBoard = e.clientX === 0 && e.clientY === 0;
        if (!isKeyBoard) {
            updateGameContext(props.model.clickEmpty({ isKeyBoard }));
        }
    };

    let label = getStackLabel(props.model.source);
    label += ": empty socket";

    return (
        <button
            className={getClassName()}
            onClick={onClick}
            disabled={!!props.model.stack.length}
            tabIndex={!props.model.stack.length ? 0 : -1}
            aria-label={label}
            title={label}
        >
            {props.children}
        </button>
    );
};
export default StackBase;
