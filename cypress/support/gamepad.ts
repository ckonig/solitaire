import { GamePadEvent, Gamepad } from "./IGamePad";

const XboxReference = {
    buttons: ["A", "B", "X", "Y", "LB", "RB", "LT", "RT", "Back", "Start", "LS", "RS", "DPadUp", "DPadDown", "DPadLeft", "DPadRight"],
    axis: ["LeftStickX", "-LeftStickY", "RightStickX", "-RightStickY"],
};

const TestGamepadLayout = {
    up: () => XboxReference.buttons.indexOf("DPadUp"),
    down: () => XboxReference.buttons.indexOf("DPadDown"),
    right: () => XboxReference.buttons.indexOf("DPadRight"),
    left: () => XboxReference.buttons.indexOf("DPadLeft"),
    cancel: () => XboxReference.buttons.indexOf("B"),
    action: () => XboxReference.buttons.indexOf("A"),
    undo: () => XboxReference.buttons.indexOf("Y"),
    hint: () => XboxReference.buttons.indexOf("X"),
    pause: () => XboxReference.buttons.indexOf("Start"),
    menu: () => XboxReference.buttons.indexOf("Back"),
    mapButton: (b: string) => XboxReference.buttons.indexOf(b),
};

const button = () => ({
    pressed: false,
    touched: false,
    value: 0,
});
const getGamepad: (index: number) => Gamepad = (index) => ({
    axes: [0, 0, 0, 0],
    buttons: [...Array(16)].map((_k) => button()),
    connected: false,
    id: `test gamepad ${index}`,
    index: index,
    mapping: "standard",
    timestamp: Math.floor(Date.now() / 1000),
});

export class TestGamepads {
    private pads: TestGamepad[];
    constructor() {
        this.pads = [
            new TestGamepad(getGamepad(0)),
            new TestGamepad(getGamepad(1)),
            new TestGamepad(getGamepad(2)),
            new TestGamepad(getGamepad(3)),
        ];
    }
    get = (i: number) => this.pads[i];
    inject = () =>
        ({
            onBeforeLoad: (win: any) => {
                win.navigator.getGamepads = () => ({
                    0: this.pads[0].getPad(),
                    1: this.pads[1].getPad(),
                    2: this.pads[2].getPad(),
                    3: this.pads[3].getPad(),
                    length: 4,
                });
            },
        } as Partial<any>);
}

export class TestGamepad {
    private pad: Gamepad;
    constructor(pad: Gamepad) {
        this.pad = pad;
    }

    getPad = () => this.pad;

    connect = () => {
        const event = new Event("gamepadconnected") as GamePadEvent;
        this.pad.connected = true;
        this.pad.timestamp = Math.floor(Date.now() / 1000);
        event.gamepad = this.pad;
        window.dispatchEvent(event);
    };
    disconnect = () => {
        const event = new Event("gamepaddisconnected") as GamePadEvent;
        this.pad.connected = false;
        this.pad.timestamp = Math.floor(Date.now() / 1000);
        event.gamepad = this.pad;
        window.dispatchEvent(event);
    };
    pressButton = (button: string, duration = 20) => {
        const index = TestGamepadLayout.mapButton(button);
        //press down
        this.pad.buttons[index].pressed = true;
        this.pad.buttons[index].value = 1;
        this.pad.timestamp = Math.floor(Date.now() / 1000);
        //press up later
        setTimeout(() => {
            //press up
            this.pad.buttons[index].pressed = false;
            this.pad.buttons[index].value = 0;

            this.pad.timestamp = Math.floor(Date.now() / 1000);
            //console.log('depressed button', button, index)
        }, duration * 10);
        //wait for press up
        cy.wait(duration * 11);
    };
}

const _gamepads = new TestGamepads();

export const gamepads: (index?: number) => TestGamepads = () => _gamepads;
export const gamepad: (index?: number) => TestGamepad = (index = 0) => _gamepads.get(index);
