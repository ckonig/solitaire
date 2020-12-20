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
        } else if (state.focus.hasStack(props.parent)) {
            classname += " socket-focused";
        } else {
            classname += " socket-empty";
        }
    } else {
        classname += " socket-full";
    }

    if (props.suggested) {
        classname += " socket-suggested";
    }

    const onClick = (e) => {
        e.preventDefault();
        const isKeyBoard = e.clientX == 0 && e.clientY == 0;
        props.onClick(null, { isKeyBoard });
    };

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
            onClick={onClick}
            disabled={!props.visible}
            tabIndex={props.visible ? 0 : -1}
        >
            {props.children}
        </button>
    );
};
export default StackBase;
