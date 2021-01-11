import CardModel from "../../Model/Deck/Card";
import GameModes from "../../GameModes";
import GlobalContext from "../Context";
import PauseContext from "../PauseContext";
import React from "react";
import confetti from "canvas-confetti";
import { getEmptyImage } from "react-dnd-html5-backend";
import getStackLabel from "./StackDescription";
import { useDrag } from "react-dnd";

type CardProps = {
    index: number;
    accepting?: boolean;
    models: CardModel[];
    isSuggested?: (index: number) => boolean | undefined;
    isSelected?: (index: number) => boolean;
    blink?: number;
    zIndex?: number;
    offsetTop?: (index: number, models: CardModel[]) => number;
    offsetLeft?: (index: number) => number;
    isDrag?: boolean;
};

const Card = (props: CardProps) => {
    const ReRender = () => (
        <Card
            {...{
                ...props,
                models: props.models.slice(props.index, props.models.length),
                offsetLeft: () => 0,
                isSelected: () => false,
                index: 0,
                isDrag: isDrag,
            }}
        />
    );
    if (!props.models.length) {
        return null;
    }
    const model = props.models[props.index];
    ReRender.displayName = "ReRender";
    //@todo for proper drag & drop of stacks, we need each card to render the following ones
    const { state, updateGameContext } = React.useContext(GlobalContext);
    if (!state) return null;
    const pause = React.useContext(PauseContext);
    const inputEl = React.useRef<HTMLButtonElement>(null);
    const isFocused = state.focus.hasCard(model);
    const [isDrag, setDrag] = React.useState<boolean>(!!props.isDrag);
    const _isDrag = props.isDrag || isDrag;
    const [{ opacity }, dragRef, preview] = useDrag({
        item: { type: "card", model: model, render: ReRender() },
        collect: (monitor) => {
            return { opacity: monitor.isDragging() ? 1 : 1 };
        },
        canDrag: () => model.canClick() && !model.isHidden && (state.hand.currentCard() == null || model.equals(state.hand.currentCard())),
        begin: () => {
            setDrag(true);
            //@todo if other card is still selected, drop it first.
            if (model.onClick && (!props.isSelected || !props.isSelected(props.index))) {
                updateGameContext((context) => {
                    model.onClick({ isKeyboard: false })(context);
                });
            }
        },
        end: (_item, monitor) => {
            setDrag(false);
            if (!monitor.didDrop()) {
                updateGameContext((context) => {
                    model.onClick({ isKeyboard: false })(context);
                });
            }
        },
    });

    //Deactivate native dnd preview - it's fast but it's not working on mobile.
    React.useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true });
    }, []);

    const getRef = () => (model.canClick() ? dragRef : inputEl);
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
                x: e.clientX - (ele?.ownerDocument?.defaultView?.pageXOffset || 0),
                y: e.clientY - (ele?.ownerDocument?.defaultView?.pageYOffset || 0),
            },
            element: {
                x: rect.x,
                y: rect.y,
            },
        };

        const isSinglePlayer = state.settings.launchSettings.boardMode === GameModes.SINGLEPLAYER;
        //@todo A11Y allow keyboard actions in singleplayer
        if (model.onClick && !position.isKeyBoard) {
            updateGameContext((context) => {
                model.onClick(position)(context);
                if (isSinglePlayer) {
                    context.settings.launchSettings.inputMode = "mouse";
                }
            });
        }
    };

    const getClassName = () => {
        const hasSuggestion = (props.isSuggested && props.isSuggested(props.index)) || model.suggestion;
        let className = `card card-base suit-${model.type.icon}`;
        className +=
            (!props.isSelected || !props.isSelected(props.index)) && !isFocused && !hasSuggestion ? ` card-stack-${model.source}` : "";
        className += !_isDrag && props.isSelected && props.isSelected(props.index) && !_isDrag ? " card-selected" : "";
        className += props.blink ? " blink" : "";
        className += model.canClick() ? " clickable" : "";
        //@todo onhover, trigger highlight of suggested target card/stack (preview what happens if picked up)
        className += hasSuggestion && !isFocused ? " card-suggested" : "";
        className += isFocused ? " card-focused" : "";
        className += props.accepting ? " card-accepts" : "";
        return className;
    };

    const getCardStyle = () => {
        const style = {
            opacity: _isDrag ? 0 : opacity,
            zIndex: (props.zIndex ? props.zIndex : (props.offsetTop && props.offsetTop(props.index, props.models) > 0 ? 1 : 0) * 20) + 1,
            top: props.offsetTop ? props.offsetTop(props.index, props.models) / 15 + "em" : 0,
            ...model.entropyStyle,
        };

        //move to left on waste (triple draw)
        if (props.offsetLeft) {
            style.left = props.offsetLeft(props.index) * 2 + "em";
        }

        if (!model.onClick) {
            style.pointerEvents = "none";
        }

        return style;
    };

    const getStackbaseStyle: () => React.CSSProperties = () => {
        if (!model.onClick) {
            return { pointerEvents: "none" };
        }

        return {};
    };

    let label = getStackLabel(model.source);
    label += ": ";

    label += model.isHidden ? "hidden card" : model.type.icon + model.face;

    // @todo 3d flip https://3dtransforms.desandro.com/card-flip on unhide
    // https://medium.com/hackernoon/5-ways-to-animate-a-reactjs-app-in-2019-56eb9af6e3bf

    return (
        <>
            <div style={getStackbaseStyle()} className="stack-base">
                <FireworkWatcher model={model} />
                <button
                    onFocus={() => {
                        // updateContext((ctx) => {
                        //     ctx.navigator.update(model.source, props.model);
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
                    disabled={!model.canClick() || pause.state.paused}
                    tabIndex={model.canClick() ? 0 : -1}
                    aria-label={label}
                    title={label}
                >
                    <div className="card-content">
                        {model.isHidden || pause.state.paused ? (
                            <div className="card-back">&nbsp;</div>
                        ) : (
                            <div className="card-grid-container">
                                <div>
                                    <div className="align-center">{model.type.icon}</div>
                                </div>
                                <div>
                                    <div className="align-left">{model.face}</div>
                                </div>
                                <div>&nbsp;</div>
                                <div>
                                    <div className="align-center">{model.type.icon}</div>
                                </div>
                                <div className="mainface">
                                    <div className="align-center">{model.face} </div>
                                </div>
                                <div>
                                    <div className="align-center">{model.type.icon}</div>
                                </div>
                                <div>&nbsp;</div>
                                <div>
                                    <div className="align-right">{model.face}</div>
                                </div>
                                <div>
                                    <div className="align-center">{model.type.icon}</div>
                                </div>
                            </div>
                        )}
                    </div>
                </button>
            </div>
            {props.models.length - 1 > props.index && <Card {...props} isDrag={_isDrag} index={props.index + 1} />}
        </>
    );
};

export default Card;

const FireworkWatcher = (props: { model: CardModel }) => {
    const { state, updateContext } = React.useContext(GlobalContext);
    if (!state) return null;
    const origin = {
        x: 0,
        y: 0,
    };
    //@todo position also depends on slitscreen or singleplayer
    // firework on every success is too much.
    // make achievements instead, let player earn badges (good for toasts too).
    // also, use fireworks when auto solving and winning
    if (props.model.source.substring(0, 11) == "foundation-") {
        const foundationIndex = parseInt(props.model.source.substring(11));
        origin.y = 0.2;
        origin.x = (foundationIndex + 3) / (7 / 100) / 100;
    }
    if (props.model.source.substring(0, 8) == "tableau-") {
        const tableauIndex = parseInt(props.model.source.substring(8));
        origin.y = 0.7;
        origin.x = tableauIndex / (7 / 100) / 100;
    }

    React.useEffect(() => {
        if (props.model.success) {
            FireWork();
            const timeout = setTimeout(() => updateContext((ctx) => ctx.clearSuccess(props.model)), 25);
            return () => clearTimeout(timeout);
        }
    }, [state?.token, props.model.success]);
    const FireWork = () => {
        const count = 200;
        const defaults = {
            ticks: 50,
            origin,
        };

        const fire = (particleRatio: any, opts: any) => {
            confetti(
                Object.assign({}, defaults, opts, {
                    particleCount: Math.floor(count * particleRatio),
                })
            );
        };

        fire(0.25, {
            spread: 48,
            startVelocity: 55,
        });
        fire(0.2, {
            spread: 120,
        });
        fire(0.35, {
            spread: 160,
            decay: 0.91,
            scalar: 0.8,
        });
        fire(0.1, {
            spread: 200,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2,
        });
        fire(0.1, {
            spread: 240,
            startVelocity: 45,
        });
        fire(0.1, {
            spread: 359,
            startVelocity: 45,
        });
        return null;
    };
    return null;
};
