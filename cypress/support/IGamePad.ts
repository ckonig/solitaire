export interface GamePadEvent extends Event {
    gamepad: any;
}

export interface Gamepad {
    connected: boolean;
}

export interface ChromeGamepadArray {
    0: Gamepad;
    1: Gamepad;
    2: Gamepad;
    3: Gamepad;
    length: number;
}

export interface FakeGamepad {
    inject: () => Partial<any>;
    connect: () => void;
    disconnect: () => void;
    pressButton: (button: string) => void;
}
