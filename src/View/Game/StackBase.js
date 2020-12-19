import GlobalContext from "../Context";
import React from "react";

const StackBase = (props) => {
    let classname = "card-base socket";
    const inputEl = React.useRef(null);
    const { state, updateContext } = React.useContext(GlobalContext);
    React.useEffect(() => {
        if (state.focus.hasStack(props.parent)) {
            inputEl && inputEl.current && inputEl.current.focus();
        }
    });
    if (props.visible) {
        if (props.blink) {
            classname += " socket-blink";
        } else {
            classname += " socket-empty";
        }
    } else {
        classname += " socket-full";
    }

    if (props.suggested) {
        classname += " socket-suggested";
    }

    return (
        <button
            onFocus={() => {
                updateContext((ctx) => {
                    ctx.navigator.update(props.parent);
                });
            }}
            onBlur={() => {
                updateContext((ctx) => ctx.focus.unsetStack(props.parent));
            }}
            ref={inputEl}
            className={classname}
            onClick={() => props.onClick()}
            disabled={!props.visible}
        >
            {props.children}
        </button>
    );
};
export default StackBase;
