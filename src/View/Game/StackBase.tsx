import GameModes from "../../GameModes";
import { IStack } from "../../Model/Game/Stack";
import React from "react";
import getStackLabel from "./StackDescription";
import useGlobalContext from "../GlobalContext";

const StackBase = (props: { model: IStack; children?: any | null }) => {
    let classname = "card-base socket";
    const inputEl = React.useRef<HTMLButtonElement>(null);
    const { state, updateGameContext } = useGlobalContext();
    React.useEffect(() => {
        if (state.focus.hasStack(props.model.source) && state.settings.launchSettings.boardMode == GameModes.SINGLEPLAYER) {
            const current = inputEl && inputEl.current ? inputEl.current : null;
            current && current.focus();
        }
    });
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

    const onClick = (e: any) => {
        e.preventDefault();
        const isKeyBoard = e.clientX == 0 && e.clientY == 0;
        if (!isKeyBoard) {
            updateGameContext(props.model.clickEmpty({ isKeyBoard }));
        }
    };

    let label = getStackLabel(props.model.source);
    label += ": empty socket";

    return (
        <button
            onFocus={() => {
                // updateContext((ctx) => {
                //     ctx.navigator.update(props.model.parent);
                // });
            }}
            onBlur={() => {
                // updateContext((ctx) => ctx.focus.unsetStack(props.model.parent));
            }}
            ref={inputEl}
            className={classname}
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
