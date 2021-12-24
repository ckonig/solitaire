import { mdiControllerClassic, mdiKeyboard, mdiMouse } from "@mdi/js";

export interface IControlPreset {
    id: number;
    icon: string;
    inputMethod: string;
    inputLayout: number;
    lines: string[],
}
export const ControlPresets: IControlPreset[] = [
    {
        id: 0,
        icon: mdiMouse ,
        inputMethod: "mouse",
        inputLayout: 0,
        lines: ["Mouse or", "Touchpad"],
    },
    {
        id: 1,
        icon: mdiControllerClassic ,
        inputMethod: "gamepad",
        inputLayout: 0,
        lines: ["Gamepad 1"],
    },
    {
        id: 2,
        icon: mdiControllerClassic ,
        inputMethod: "gamepad",
        inputLayout: 1,
        lines: ["Gamepad 2"],
    },
    {
        id: 3,
        icon: mdiKeyboard ,
        inputMethod: "keyboard",
        inputLayout: 0,
        lines: ["Keyboard", "WASD"],
    },
    {
        id: 4,
        icon: mdiKeyboard ,
        inputMethod: "keyboard",
        inputLayout: 1,
        lines: ["Keyboard", "ARROWS"],
    },
    {
        id: 5,
        icon: mdiKeyboard ,
        inputMethod: "keyboard",
        inputLayout: 2,
        lines: ["Keyboard", "NUMPAD"],
    },
];
