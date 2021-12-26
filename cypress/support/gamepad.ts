import { ChromeGamepadArray, FakeGamepad, GamePadEvent, Gamepad } from "./IGamePad";

const button = () => ({
    pressed: false,
    touched: false,
    value: 0,
});
const getGamepad: (index: number) => Gamepad = (index) => ({
    axes: [0, 0, 0, 0],
    buttons: [...Array(16)].map((_k) => button()),
    connected: false,
    id: "Standard gamepad by Alvaro Montoro",
    index: index,
    mapping: "standard",
    timestamp: Math.floor(Date.now() / 1000),
});

const pads: ChromeGamepadArray = {
    0: getGamepad(0),
    1: getGamepad(1),
    2: getGamepad(2),
    3: getGamepad(3),
    length: 4,
};

export const gamepad: (index?: number) => FakeGamepad = (index = 0) => ({
    inject: () =>
        ({
            // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
            onBeforeLoad(win) {
                win.navigator.getGamepads = () => pads;
            },
        } as Partial<any>),
    connect: () => {
        const event = new Event("gamepadconnected") as GamePadEvent;
        pads[index].connected = true;
        pads[index].timestamp = Math.floor(Date.now() / 1000);
        event.gamepad = pads[index].fakeController;
        window.dispatchEvent(event);
        console.log("connected");
        console.log(pads);
    },
    disconnect: () => {
        const event = new Event("gamepaddisconnected") as GamePadEvent;
        pads[index].connected = false;
        pads[index].timestamp = Math.floor(Date.now() / 1000);
        event.gamepad = pads[index];
        window.dispatchEvent(event);
        console.log("disconnected");
    },
    pressButton: (button: string, duration = 25) => {
        //@todo map buttons
        //press down
        pads[index].buttons[index].pressed = true;
        pads[index].timestamp = Math.floor(Date.now() / 1000);
        console.log("pressed", index, pads[index].buttons[index]);
        //wait
        setTimeout(() => {
            //press up
            pads[index].buttons[index].pressed = false;
            pads[index].timestamp = Math.floor(Date.now() / 1000);
            console.log("depressed", index, pads[index].buttons[index]);
        }, duration * 10);
    },
    pressDirection: (direction: string, duration = 25) => {
        //@todo
        //press down
        // const value = ["u", "l"].indexOf(dir) > -1 ? -1 : 1;
        // const pos = ["u", "d"].indexOf(dir) > -1 ? 1 : 0;
        // pads[index].axes[axe * 2 + pos] = value;
        // pads[index].timestamp = Math.floor(Date.now() / 1000);
        //wait
        //press up
        // const pos = ["u", "d"].indexOf(dir) > -1 ? 1 : 0;
        // pads[index].axes[axe * 2 + pos] = 0;
        // pads[index].timestamp = Math.floor(Date.now() / 1000);
    },
});
