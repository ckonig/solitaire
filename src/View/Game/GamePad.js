import GlobalContext from "../Context";
import PS4 from "./layouts/PS4";
import React from "react";
import ReactGamePad from "react-gamepad";

const GamePad = () => {
    const { state, updateContext } = React.useContext(GlobalContext);
    const before = { x: state.navigator.currentIndex.x, y: state.navigator.currentIndex.y, z: state.navigator.currentIndex.z };
    const buttonHandler = (e) => {
        console.log(e);
        if (e == "DPadLeft") {
            updateContext((ctx) => {
                ctx.settings.mouseMode = "remain-on-stack";
                ctx.focus.isKeyBoard(true);
                ctx.navigator.moveLeft(before);
            });
        }
        if (e == "DPadRight") {
            updateContext((ctx) => {
                ctx.settings.mouseMode = "remain-on-stack";
                ctx.focus.isKeyBoard(true);
                ctx.navigator.moveRight(before);
            });
        }
        if (e == "DPadUp") {
            updateContext((ctx) => {
                ctx.settings.mouseMode = "remain-on-stack";
                ctx.focus.isKeyBoard(true);
                ctx.navigator.moveUp(before);
            });
        }
        if (e == "DPadDown") {
            updateContext((ctx) => {
                ctx.settings.mouseMode = "remain-on-stack";
                ctx.focus.isKeyBoard(true);
                ctx.navigator.moveDown(before);
            });
        }
        if (e == "A") {
            document.activeElement.click();
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
    return (
        <>
            <ReactGamePad
                layout={PS4}
                gamepadIndex={0}
                onButtonDown={buttonHandler}
                onConnect={connectHandler}
                onDisconnect={disconnectHandler}
            >
                <span>gamepad</span>
            </ReactGamePad>
            <ReactGamePad
                layout={PS4}
                gamepadIndex={1}
                onButtonDown={buttonHandler}
                onConnect={connectHandler}
                onDisconnect={disconnectHandler}
            >
                <span>gamepad</span>
            </ReactGamePad>
        </>
    );
};

export default GamePad;
