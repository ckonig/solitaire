import React, { MouseEventHandler, useCallback, useContext } from "react";

import CardFirework from "./CardFirework";
import CardModel from "../../Model/Deck/Card";
import GameModes from "../../GameModes";
import { getEmptyImage } from "@pspdfkit-labs/react-dnd-html5-backend";
import getStackLabel from "./StackDescription";
import { useDrag } from "react-dnd";
import useGlobalContext from "../GlobalContext";
import usePauseContext from "./PauseContext";
import { useBoardContext } from "./BoardContext";

const useCardStyle = (model: CardModel | null, props: CardProps, _isDrag: () => boolean, opacity: any) => {
    const getCardStyle = useCallback(() => {
        if (!model) {
            return {};
        }
        const style = {
            opacity: _isDrag() ? 0 : opacity,
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
    }, [model, props, _isDrag, opacity]);

    const [cardStyle, setCardStyle] = React.useState<any>(getCardStyle());

    React.useEffect(() => {
        setCardStyle(getCardStyle);
    }, [getCardStyle]);
    return cardStyle;
};

//@todo this makes the card flash when placing on green table. class is first assigned empty
const useClassName = (model: CardModel | null, props: CardProps, _isDrag: () => boolean, isFocused: () => boolean) => {
    const getClassName = useCallback(() => {
        if (!model) {
            return "card card-base";
        }
        const hasSuggestion = (props.isSuggested && props.isSuggested(props.index)) || model.suggestion;
        let className = `card card-base suit-${model.type.icon}`;
        className +=
            (!props.isSelected || !props.isSelected(props.index)) && !isFocused() && !hasSuggestion ? ` card-stack-${model.source}` : "";
        className += !_isDrag() && props.isSelected && props.isSelected(props.index) && !_isDrag() ? " card-selected" : "";
        className += props.blink ? " blink" : "";
        className += model.canClick() ? " clickable" : "";
        className += hasSuggestion && !isFocused() ? " card-suggested" : "";
        className += isFocused() ? " card-focused" : "";
        return className;
    }, [_isDrag, isFocused, model, props]);

    const [className, setClassName] = React.useState<string>(getClassName());

    React.useEffect(() => {
        setClassName(getClassName());
    }, [getClassName]);

    return className;
};

const useStackBaseStyle = (model: CardModel | null) => {
    const getStackbaseStyle: () => React.CSSProperties = useCallback(() => {
        if (!model || !model.onClick) {
            return { pointerEvents: "none" };
        }

        return {};
    }, [model]);

    const [stackbaseStyle, setStackbaseStyle] = React.useState<any>(getStackbaseStyle());

    React.useEffect(() => {
        setStackbaseStyle(getStackbaseStyle());
    }, [getStackbaseStyle]);
    return stackbaseStyle;
};

const useLabel = (model: CardModel | null) => {
    const [label, setLabel] = React.useState("");
    React.useEffect(() => {
        if (model) {
            let l = getStackLabel(model.source);
            l += ": ";
            l += model.isHidden ? "hidden card" : model.type.icon + model.face;
            setLabel(l);
        }
    }, [model]);

    return label;
};

type CardProps = {
    index: number;
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
    const { player } = useBoardContext();
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
    ReRender.displayName = "ReRender";
    const { state, updateGameContext } = useGlobalContext();
    const pause = usePauseContext();
    const inputEl = React.useRef<HTMLButtonElement>(null);
    const [isDrag, setDrag] = React.useState<boolean>(!!props.isDrag);

    const model: CardModel = props.models[props.index];
    const isFocused = useCallback(() => !!model && state.focus.hasCard(model), [model, state.focus]);

    const _isDrag = useCallback(() => props.isDrag || isDrag, [props.isDrag, isDrag]);

    const [{ opacity }, dragRef, preview] = useDrag({
        type: 'card',
        item: (_monitor) => {
            setDrag(true)
            if (model.onClick && (!props.isSelected || !props.isSelected(props.index))) {
                updateGameContext((context) => {
                    model.onClick({ isKeyboard: false })(context);
                });
            }
            return { type: "card", model: model, render: ReRender() }
        },
        collect: (monitor) => {
            return { opacity: monitor.isDragging() ? 1 : 1 };
        },
        canDrag: () => model.canClick() && !model.isHidden && (state.hand.currentCard() === null || model.equals(state.hand.currentCard())),

        end: (_item, monitor) => {
            setDrag(false);
            if (!monitor.didDrop()) {
                setTimeout(
                    () =>
                        updateGameContext((context) => {
                            model.onClick({ isKeyboard: false })(context);
                        }),
                    1
                );
            }
        },
    });

    //Deactivate native dnd preview - it's fast but it's not working on mobile.

    React.useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true });
    }, [preview]);

    const getRef = useCallback(() => (model.canClick() ? dragRef : inputEl), [inputEl, model, dragRef]);

    React.useEffect(() => {
        if (isFocused() && state.settings.launchSettings.boardMode === GameModes.SINGLEPLAYER) {
            inputEl && inputEl.current && inputEl.current.focus();
        }
        //@todo how to one-time hook in valid way?
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFocused]);

    const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        const isKeyBoard = e.clientX === 0 && e.clientY === 0;
        let ele = e.target as HTMLElement;

        while (ele && !ele.className.includes("card-base") && ele.offsetParent) {
            ele = ele.offsetParent as HTMLElement;
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
        //@todo A11Y allow keyboard tab navigation in singleplayer
        if (model.onClick && !position.isKeyBoard) {
            updateGameContext((context) => {
                model.onClick(position)(context);
                if (isSinglePlayer) {
                    context.settings.launchSettings.players[player].inputMethod = "mouse";
                }
            });
        }
    };
    const className = useClassName(model, props, _isDrag, isFocused);
    const cardStyle = useCardStyle(model, props, _isDrag, opacity);
    const stackbaseStyle = useStackBaseStyle(model);
    const label = useLabel(model);

    // @todo 3d flip https://3dtransforms.desandro.com/card-flip on unhide
    // https://medium.com/hackernoon/5-ways-to-animate-a-reactjs-app-in-2019-56eb9af6e3bf
    //@todo entropy as animated effect, triggered after rendering of action

    if (!props.models.length) {
        return null;
    }

    //@todo creating a custom face was fun, but the users deserve a more professional looking SVG
    //e.g. https://totalnonsense.com/download/download-vector-playing-cards/

    return (
        <>
            <div style={stackbaseStyle} className="stack-base">
                <button
                    onFocus={() => {
                        //@todo re-enable focusing
                        // updateContext((ctx) => {
                        //     ctx.navigator.update(model.source, props.model);
                        // });
                    }}
                    onBlur={() => {
                        //updateContext((ctx) => ctx.focus.unsetCard(props.model));
                    }}
                    style={cardStyle}
                    // ref={inputEl}
                    ref={getRef()}
                    className={className}
                    onClick={onClick}
                    disabled={!model.canClick() || !pause.state.showCards}
                    tabIndex={model.canClick() ? 0 : -1}
                    aria-label={label}
                    title={label}
                >
                    <CardFirework model={model} />
                    <div className="card-content">
                        {model.isHidden || !pause.state.showCards ? (
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
            {props.models.length - 1 > props.index && <Card {...props} isDrag={_isDrag()} index={props.index + 1} />}
        </>
    );
};

export default Card;
