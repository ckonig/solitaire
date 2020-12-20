import GlobalContext from "../Context";
import React from "react";

const Card = (props) => {
    const { state, updateContext } = React.useContext(GlobalContext);
    const inputEl = React.useRef(null);
    React.useEffect(() => {
        if (state.focus.hasCard(props.model)) {
            inputEl && inputEl.current && inputEl.current.focus();
        }
    });
    const onClick = (e) => {
        e.preventDefault();
        const isKeyBoard = e.clientX == 0 && e.clientY == 0;
        let ele = e.target;

        while (ele && !ele.className.includes("card-base")) {
            ele = ele.offsetParent;
        }

        const rect = ele.getBoundingClientRect();
        const position = {
            isKeyBoard,
            click: {
                x: e.clientX - ele.ownerDocument.defaultView.pageXOffset,
                y: e.clientY - ele.ownerDocument.defaultView.pageYOffset,
            },
            element: {
                x: rect.x,
                y: rect.y,
            },
        };

        props.onClick && props.onClick({ ...props.model }, position);
    };

    const getClassName = () => {
        const hasSuggestion = props.isSuggested || props.model.suggestion;
        const hasFocus = state.focus.hasCard(props.model);
        let className = `card card-base suit-${props.model.type.icon}`;
        className += !props.isSelected && !hasSuggestion ? ` card-stack-${props.model.source}` : "";
        className += props.isSelected ? " card-selected" : "";
        className += props.blink ? " blink" : "";
        className += props.canClick ? " clickable" : "";
        //@todo onhover, trigger highlight of suggested target card/stack (preview what happens if picked up)
        className += hasSuggestion ? " card-suggested" : "";
        className += hasFocus ? " card-focused" : "";

        return className;
    };

    const getCardStyle = () => {
        const style = {
            zIndex: props.zIndex ? props.zIndex : !!props.offsetTop + 2,
            top: props.offsetTop ? props.offsetTop / 10 + "vw" : 0,
            ...props.model.entropyStyle,
        };

        //move to left on waste (triple draw)
        if (props.offsetLeft) {
            style.left = props.offsetLeft * 4 + "vw";
        }

        if (!props.onClick) {
            style.pointerEvents = "none";
        }

        return style;
    };

    const getStackbaseStyle = () => {
        if (!props.onClick) {
            return { pointerEvents: "none" };
        }

        return {};
    };

    const label = props.model.isHidden ? "hidden card" : props.model.type.icon + props.model.face + " card";

    // @todo 3d flip https://3dtransforms.desandro.com/card-flip on unhide
    // https://medium.com/hackernoon/5-ways-to-animate-a-reactjs-app-in-2019-56eb9af6e3bf

    return (
        <div style={getStackbaseStyle()} className="stack-base">
            <button
                onFocus={() => {
                    updateContext((ctx) => {
                        ctx.navigator.update(props.model.source, props.index)
                    });
                }}
                onBlur={() => {
                    updateContext((ctx) => ctx.focus.unsetCard(props.model));
                }}
                style={getCardStyle()}
                ref={inputEl}
                className={getClassName()}
                onClick={onClick ? onClick : null}
                disabled={!props.model.canClick}
                tabIndex={props.model.canClick?0:-1}
                aria-label={label}
            >
                {props.model.isHidden ? (
                    <div className="card-back">&nbsp;</div>
                ) : (
                    <div className="card-grid-container">
                        <div>
                            <div className="align-center">{props.model.type.icon}</div>
                        </div>
                        <div>
                            <div className="align-left">{props.model.face}</div>
                        </div>
                        <div>&nbsp;</div>
                        <div>
                            <div className="align-center">{props.model.type.icon}</div>
                        </div>
                        <div className="mainface">
                            <div className="align-center">{props.model.face}</div>
                        </div>
                        <div>
                            <div className="align-center">{props.model.type.icon}</div>
                        </div>
                        <div>&nbsp;</div>
                        <div>
                            <div className="align-right">{props.model.face}</div>
                        </div>
                        <div>
                            <div className="align-center">{props.model.type.icon}</div>
                        </div>
                    </div>
                )}
            </button>
        </div>
    );
};

export default Card;
