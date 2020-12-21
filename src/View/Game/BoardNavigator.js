import GlobalContext from "../Context";
import Navigator from "../Navigator";
import React from "react";

const BoardNavigator = () => {
    const { state, updateContext, updateGameContext, replaceContext } = React.useContext(GlobalContext);
    const before = { x: state.navigator.currentIndex.x, y: state.navigator.currentIndex.y, z: state.navigator.currentIndex.z };
    const isPaused = !!state.game.paused;

    const onLeft = (modifier) =>
        updateContext((ctx) => {
            modifier(ctx);
            ctx.navigator.moveLeft(before);
        });

    const onRight = (modifier) =>
        updateContext((ctx) => {
            modifier(ctx);
            ctx.navigator.moveRight(before);
        });

    const onUp = (modifier) =>
        updateContext((ctx) => {
            modifier(ctx);
            ctx.navigator.moveUp(before);
        });

    const onDown = (modifier) =>
        updateContext((ctx) => {
            modifier(ctx);
            ctx.navigator.moveDown(before);
        });

    const onAction = (modifier) =>
        updateGameContext((ctx) => {
            modifier(ctx);
            state.navigator.pressCurrent()(ctx);
        });

    const onCancel = (modifier) =>
        updateContext((ctx) => {
            modifier(ctx);
            ctx.hand.stack.length && ctx.hand.stack[0].onClick({ isKeyboard: true })(ctx);
        });

    const onPause = (modifier) =>
        updateContext((ctx) => {
            modifier(ctx);
            ctx.game.togglePause(isPaused);
        });

    const isVisible = (state) => state.settings.suggestionMode.supportsHints || state.settings.suggestionMode.isTemporary;
    const isDisabled = (state) => state.settings.suggestionMode.isTemporary;

    const onHint = (modifier) => {
        updateContext((state) => {
            modifier(state);
            if (isVisible(state) && !isDisabled(state)) {
                state.settings.enableHint();
            }
        });
    };

    const onUndo = () => {
        replaceContext((_state) => {
            const previous = _state.game.timemachine.popPreviousState(state.game.timemachine.previousStates.length - 1, state);
            if (previous) {
                previous.game.rating.penalize(_state.game.rating);
                return previous;
            }
            return null;
        });
    };

    return isPaused ? null : (
        <Navigator
            onLeft={onLeft}
            onRight={onRight}
            onUp={onUp}
            onDown={onDown}
            onAction={onAction}
            onCancel={onCancel}
            onHint={onHint}
            onUndo={onUndo}
            onPause={onPause}
        />
    );
};

export default BoardNavigator;
