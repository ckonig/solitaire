import GlobalContext from "../Context";
import React from "react";
import ReactGamePad from "react-gamepad";

const GamePad = () => {
    const { state, updateContext, updateGameContext } = React.useContext(GlobalContext);
    const before = { x: state.navigator.currentIndex.x, y: state.navigator.currentIndex.y, z: state.navigator.currentIndex.z };
    const isGamePadDriven = state.settings.launchSettings.inputMode == "gamepad";
    const isSinglePlayer = state.settings.launchSettings.mode === "singleplayer";
    const buttonHandler = (e) => {
        console.log(e);
        if (e == "DPadLeft") {
            updateContext((ctx) => {
                ctx.focus.isKeyBoard(true);
                if (isSinglePlayer) {
                    ctx.settings.mouseMode = "remain-on-stack";
                    ctx.settings.launchSettings.inputMode = "gamepad";
                }
                ctx.navigator.moveLeft(before);
            });
        }
        if (e == "DPadRight") {
            updateContext((ctx) => {
                ctx.focus.isKeyBoard(true);
                if (isSinglePlayer) {
                    ctx.settings.mouseMode = "remain-on-stack";
                    ctx.settings.launchSettings.inputMode = "gamepad";
                }
                ctx.navigator.moveRight(before);
            });
        }
        if (e == "DPadUp") {
            updateContext((ctx) => {
                ctx.focus.isKeyBoard(true);
                if (isSinglePlayer) {
                    ctx.settings.mouseMode = "remain-on-stack";
                    ctx.settings.launchSettings.inputMode = "gamepad";
                }
                ctx.navigator.moveUp(before);
            });
        }
        if (e == "DPadDown") {
            updateContext((ctx) => {
                ctx.focus.isKeyBoard(true);
                if (isSinglePlayer) {
                    ctx.settings.mouseMode = "remain-on-stack";
                    ctx.settings.launchSettings.inputMode = "gamepad";
                }
                ctx.navigator.moveDown(before);
            });
        }
        if (e == "A") {
            updateGameContext((context) => {
                state.navigator.pressCurrent()(context);
                context.focus.isKeyBoard(true);
                    if (isSinglePlayer) {
                        context.settings.mouseMode = "remain-on-stack";
                        context.settings.launchSettings.inputMode = "gamepad";
                    }
                //@hack: we need updateGameContext for UNDO but if there is not focus yet, this is not a business action
                context.game.timemachine.modified = true;
            });
        }
        if (e == "B") {
            //putdown
            console.debug("pressed B", e);
        }
        if (e == "X") {
            //hint
            const isVisible = (state) => state.settings.suggestionMode.supportsHints || state.settings.suggestionMode.isTemporary;
            const isDisabled = (state) => state.settings.suggestionMode.isTemporary;

            updateContext((state) => {
                if (isVisible(state) && !isDisabled(state)) {
                    state.settings.enableHint();
                }
            });
            console.debug("pressed X", e);
        }
        if (e == "Y") {
            //
            console.debug("pressed Y ", e);
        }
    };
    const connectHandler = (e) => {
        console.debug("connected", e);
    };
    const disconnectHandler = (e) => {
        console.debug("disconnected", e);
    };

    //@todo pick ID of gamepad dynamically
    //allow switching PS4 and XBOX layouts
    //also support splitscreen battle mode
    return isSinglePlayer || isGamePadDriven ? (
        <ReactGamePad gamepadIndex={0} onButtonDown={buttonHandler} onConnect={connectHandler} onDisconnect={disconnectHandler}>
            <span></span>
        </ReactGamePad>
    ) : null;
};

export default GamePad;
