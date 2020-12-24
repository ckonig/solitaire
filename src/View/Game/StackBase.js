import GlobalContext from "../Context";
import React from "react";

const StackBase = (props) => {
    let classname = "card-base socket";
    const inputEl = React.useRef(null);
    const { state, updateGameContext } = React.useContext(GlobalContext);
    React.useEffect(() => {
        if (state.focus.hasStack(props.model.parent) && state.settings.launchSettings.gameMode == "singleplayer") {
            inputEl && inputEl.current && inputEl.current.focus();
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

    const onClick = (e) => {
        e.preventDefault();
        const isKeyBoard = e.clientX == 0 && e.clientY == 0;
        if (!isKeyBoard) {
            updateGameContext(props.model.clickEmpty({ isKeyBoard }));
        }
    };

    const names = [0, 1, 2, 3, 4, 5, 6].map((id) => " stack " + (id + 1));
    let label = "";
    const split = props.model.source.split("-");
    label += split[0];
    if (split.length > 1) {
        label += names[split[1]]
    }
    label += ": empty socket"

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
            disabled={props.model.stack.length}
            tabIndex={!props.model.stack.length ? 0 : -1}
            aria-label={label}
            title={label}

        >
            {props.children}
        </button>
    );
};
export default StackBase;
