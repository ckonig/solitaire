

export interface IGamepadLayout {
    up: (e: string) => boolean;
    down: (e: string) => boolean;
    right: (e: string) => boolean;
    left: (e: string) => boolean;
    cancel: (e: string) => boolean;
    action: (e: string) => boolean;
    undo: (e: string) => boolean;
    hint: (e: string) => boolean;
    pause: (e: string) => boolean;
    menu: (e: string) => boolean;
}

const GamepadLayout: IGamepadLayout = {
    up: (e) => e === "DPadUp",
    down: (e) => e === "DPadDown",
    right: (e) => e === "DPadRight",
    left: (e) => e === "DPadLeft",
    cancel: (e) => e === "B",
    action: (e) => e === "A",
    undo: (e) => e === "Y",
    hint: (e) => e === "X",
    pause: (e) => e === "Start",
    menu: (e) => e === "Back",
};

export default GamepadLayout;
