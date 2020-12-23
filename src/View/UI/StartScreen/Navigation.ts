export class ScreenButton<T> {
    icon: string;
    lines: string[];
    id: number;
    model: T;
    constructor(id: number, icon: string, lines: string[], model: T) {
        this.id = id;
        this.icon = icon;
        this.lines = lines;
        this.model= model;
    }
}
export class ScreenRow<T> {
    buttons: ScreenButton<T>[];
    constructor(buttons: ScreenButton<T>[]) {
        this.buttons = buttons;
    }
}
