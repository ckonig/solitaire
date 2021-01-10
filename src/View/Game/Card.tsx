import CardModel from "../../Model/Deck/Card";
import GameModes from "../../GameModes";
import GlobalContext from "../Context";
import PauseContext from "../PauseContext";
import React from "react";
import getStackLabel from "./StackDescription";
import { useDrag } from "react-dnd";

type CardProps = {
    model: CardModel;
    isSuggested?: boolean;
    isSelected?: boolean;
    blink?: number;
    zIndex?: number;
    offsetTop?: number;
    offsetLeft?: number;
};

const Card = (props: CardProps) => {
    //@todo for proper drag & drop of stacks, we need each card to render the following ones
    const { state, updateGameContext } = React.useContext(GlobalContext);
    if (!state) return null;
    const pause = React.useContext(PauseContext);
    const inputEl = React.useRef<HTMLButtonElement>(null);
    const isFocused = state.focus.hasCard(props.model);
    const [{ opacity }, dragRef] = useDrag({
        item: { type: "card", text: "some text" },
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.5 : 1,
        }),
        begin: (monitor) => {
            console.log(monitor);
            if (props.model.onClick) {
                updateGameContext((context) => {
                    props.model.onClick({ isKeyboard: false })(context);
                });
            }
        },
    });
    const getRef=() => props.model.canClick() ? dragRef : inputEl;
    React.useEffect(() => {
        if (isFocused && state.settings.launchSettings.boardMode == GameModes.SINGLEPLAYER) {
            inputEl && inputEl.current && inputEl.current.focus();
        }
    }, [isFocused, state.focus.card]);
    const onClick = (e: any) => {
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
        const isSinglePlayer = state.settings.launchSettings.boardMode === GameModes.SINGLEPLAYER;
        //@todo A11Y allow keyboard actions in singleplayer
        if (props.model.onClick && !position.isKeyBoard) {
            updateGameContext((context) => {
                props.model.onClick(position)(context);
                if (isSinglePlayer) {
                    context.settings.launchSettings.inputMode = "mouse";
                }
            });
        }
    };

    const getClassName = () => {
        const hasSuggestion = props.isSuggested || props.model.suggestion;
        let className = `card card-base suit-${props.model.type.icon}`;
        className += !props.isSelected && !isFocused && !hasSuggestion ? ` card-stack-${props.model.source}` : "";
        className += props.isSelected ? " card-selected" : "";
        className += props.blink ? " blink" : "";
        className += props.model.canClick() ? " clickable" : "";
        //@todo onhover, trigger highlight of suggested target card/stack (preview what happens if picked up)
        className += hasSuggestion && !isFocused ? " card-suggested" : "";
        className += isFocused ? " card-focused" : "";
        return className;
    };

    const getCardStyle = () => {
        const style = {
            opacity,
            zIndex: (props.zIndex ? props.zIndex : (props.offsetTop ? 1 : 0) * 20) + 1,
            top: props.offsetTop ? props.offsetTop / 15 + "em" : 0,
            ...props.model.entropyStyle,
        };

        //move to left on waste (triple draw)
        if (props.offsetLeft) {
            style.left = props.offsetLeft * 2 + "em";
        }

        if (!props.model.onClick) {
            style.pointerEvents = "none";
        }

        return style;
    };

    const getStackbaseStyle: () => React.CSSProperties = () => {
        if (!props.model.onClick) {
            return { pointerEvents: "none" };
        }

        return {};
    };

    let label = getStackLabel(props.model.source);
    label += ": ";

    label += props.model.isHidden ? "hidden card" : props.model.type.icon + props.model.face;

    // @todo 3d flip https://3dtransforms.desandro.com/card-flip on unhide
    // https://medium.com/hackernoon/5-ways-to-animate-a-reactjs-app-in-2019-56eb9af6e3bf

    return (
        <div style={getStackbaseStyle()} className="stack-base">
            <button
                onFocus={() => {
                    // updateContext((ctx) => {
                    //     ctx.navigator.update(props.model.source, props.model);
                    // });
                }}
                onBlur={() => {
                    //updateContext((ctx) => ctx.focus.unsetCard(props.model));
                }}
                style={getCardStyle()}
                // ref={inputEl}
                ref={getRef()}
                className={getClassName()}
                onClick={onClick}
                disabled={!props.model.canClick() || pause.state.paused}
                tabIndex={props.model.canClick() ? 0 : -1}
                aria-label={label}
                title={label}
            >
                <div className="card-content">
                    {props.model.isHidden || pause.state.paused ? (
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
                </div>
            </button>
        </div>
    );
};

export default Card;
