import { XY } from "../Menu/Tree";

export class ScreenButton<T> implements RowElement {
    icon: string;
    lines: string[];
    id: number;
    model: T;
    render: (pos: XY) => any;
    constructor(id: number, icon: string, lines: string[], model: T, render: (pos: XY) => any) {
        this.id = id;
        this.icon = icon;
        this.lines = lines;
        this.model = model;
        this.render = render;
    }
}
export class ScreenToggle implements RowElement {
    label: string;
    description: string;
    value: boolean;
    callback: (s: boolean, pos: XY) => void;
    render: (pos: XY) => any;
    id: number;
    constructor(label: string, description: string, value: boolean, callback: (s: boolean, pos: XY) => void,  render: (toggle: ScreenToggle) => (pos: XY) => void) {
        this.id = -1;
        this.label = label;
        this.description = description;
        this.value = value;
        this.callback = callback;
        this.render = render(this);
    }
}
export interface RowElement {
    id: number;
    render: (pos: XY) => any;
}

export interface Row {
    buttons: RowElement[];
}
export class ScreenToggleRow implements Row {
    buttons: ScreenToggle[];
    constructor(buttons: ScreenToggle[]) {
        this.buttons = buttons;
    }
}
export class ScreenRow<T> implements Row {
    buttons: ScreenButton<T>[];
    constructor(buttons: ScreenButton<T>[]) {
        this.buttons = buttons;
    }
}
