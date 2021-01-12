import { BoardContext } from "../BoardContext";
import BoardGamePad from "./BoardGamePad";
import BoardKeyboard from "./BoardKeyboard";
import Model from "../../../Model/Model";
import PauseContext from "../PauseContext";
import React from "react";
import useGlobalContext from "../../GlobalContext";

type _mod = (state: Model) => void;

const BoardNavigator = () => {
    const { state, updateContext, updateGameContext, replaceContext } = useGlobalContext();
    const paused = React.useContext(PauseContext);
    const { player } = React.useContext(BoardContext);
    const before = { x: state.navigator.currentIndex.x, y: state.navigator.currentIndex.y, z: state.navigator.currentIndex.z };
    const beforeFocused = { card: state.focus.card, stack: state.focus.stack };
    const isPaused = !!paused.state.paused;

    const isVisible = (state: Model) => state.settings.suggestionMode.supportsHints || state.settings.suggestionMode.isTemporary;
    const isDisabled = (state: Model) => state.settings.suggestionMode.isTemporary;

    const handlers = {
        onLeft: (modifier: _mod) =>
            updateContext((ctx) => {
                modifier(ctx);
                ctx.navigator.moveLeft(before);
            }),

        onRight: (modifier: _mod) =>
            updateContext((ctx) => {
                modifier(ctx);
                ctx.navigator.moveRight(before);
            }),

        onUp: (modifier: _mod) =>
            updateContext((ctx) => {
                modifier(ctx);
                ctx.navigator.moveUp(before);
            }),

        onDown: (modifier: _mod) =>
            updateContext((ctx) => {
                modifier(ctx);
                ctx.navigator.moveDown(before);
            }),

        onAction: (modifier: _mod) =>
            updateGameContext((ctx) => {
                modifier(ctx);
                const handler = state?.navigator?.pressCurrent(beforeFocused);
                handler && handler(ctx);
                ctx.navigator.finishNav();
            }),

        onCancel: (modifier: _mod) =>
            updateContext((ctx) => {
                modifier(ctx);
                ctx.hand.stack.length && ctx.hand.stack[0].onClick({ isKeyboard: true })(ctx);
            }),

        onPause: (modifier: _mod) => {
            updateContext((state) => {
                modifier(state);
            });
            paused.togglePause(isPaused, player);
        },

        onHint: (modifier: _mod) => {
            updateContext((state) => {
                modifier(state);
                if (isVisible(state) && !isDisabled(state)) {
                    state.settings.enableHint();
                }
            });
        },

        onUndo: () => {
            //@todo use GlobalState token to avoid double processing
            replaceContext((_state) => {
                const previous = _state.game.timemachine.popPreviousState(state.game.timemachine.previousStates.length - 1, state);
                if (previous) {
                    previous.game.rating.penalize(_state.game.rating);
                    return previous;
                }
                return null;
            });
        },
        onMenu: (modifier: _mod) => {
            updateContext((state) => {
                modifier(state);
            });
            paused.togglePause(isPaused, player);
        },
    };

    return isPaused ? null : (
        <>
            <BoardKeyboard {...handlers} />
            <BoardGamePad {...handlers} />
        </>
    );
};

export default BoardNavigator;
