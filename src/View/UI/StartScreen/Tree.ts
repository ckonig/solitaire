export interface IButton {
    getClickable: () => IButton[];
    updateMap: (x: number, y: number) => void;
    onClick: (pos: XY) => void;
    x: number;
    y: number;
}

export class Button {
    isRoot: any;
    id: any;
    active: any;
    icon: any;
    title: any;
    onClick: (pos: XY) => void;
    onFocus: (pos: XY) => void;
    blink: boolean;
    toggled: boolean;
    children: Button[];
    x: number;
    y: number;

    constructor() {
        this.isRoot = false;
        this.id = "not null";
        this.active = false;
        this.icon = "";
        this.title = "";
        this.onClick = () => {};
        this.onFocus = () => {};
        this.blink = false;
        this.toggled = false;
        this.children = [];
        this.x = 0;
        this.y = 0;
    }
}

export class MenuLeafButton extends Button implements IButton {
    constructor(id: string, icon: string, title: string, onClick: (pos: XY) => void) {
        super();
        this.id = id;
        this.icon = icon;
        this.title = title;
        this.onClick = onClick;
    }
    updateMap: (x: number, y: number) => void = (x: number, y: number) => {
        this.x = x;
        this.y = y;
    };
    getClickable: () => IButton[] = () => {
        return [this];
    };
}

class MenuNodeButton extends Button implements IButton {
    children: any;
    toggled: any;
    constructor(children: IButton[]) {
        super();
        this.children = children;
        this.toggled = false;
    }
    updateMap: (x: number, y: number) => void = (x: number, y: number) => {
        this.x = x;
        this.y = y;
        this.children.forEach((child: IButton, index: number) => child.updateMap(x, index + 1));
    };
    getClickable: () => IButton[] = () => {
        return !this.toggled ? [this] : [this, ...this.children.map((child: IButton) => child.getClickable())].flat();
    };
}
export class MenuSectionButton extends MenuNodeButton {
    constructor(
        id: string,
        icon: string,
        title: string,
        onClick: (pos: XY) => void,
        onFocus: (pos: XY) => void,
        toggled: boolean,
        children: IButton[]
    ) {
        super(children);
        this.id = id;
        this.icon = icon;
        this.title = title;
        this.onClick = onClick;
        this.onFocus = onFocus;
        this.toggled = toggled;
    }
    moveDown = (x: number, y: number, next: number) => {
        if (this.children.length > y) {
            return { x: x, y: y + 1 };
        } else {
            return { x: next, y: 0 };
        }
    };
    moveUp = (x: number, y: number, previous: number) => {
        if (y > 1) {
            return { x: x, y: y - 1 };
        } else {
            return { x: previous, y: 0 };
        }
    };
}

export interface XY {
    x: number;
    y: number;
}

export interface NavHandler {
    moveUp: (x: number, y: number) => XY;
    moveDown: (x: number, y: number) => XY;
    moveLeft: (x: number, y: number) => XY;
    moveRight: (x: number, y: number) => XY;
    action: (xy: XY) => void;
}

export class MenuActionButton extends MenuLeafButton {
    constructor(id: string, icon: string, title: string, active: boolean, onClick: (pos: XY) => void) {
        super(id, icon, title, onClick);
        this.active = active;
        this.onClick = onClick;
    }
}

export class MenuRootButton extends MenuNodeButton implements NavHandler {
    constructor(children: IButton[]) {
        super(children);
        this.isRoot = true;
        this.children = children;
        this.children.forEach((child: IButton, i: number) => child.updateMap(i, 0));
    }
    getClickable: () => IButton[] = () => [...this.children.map((child: IButton) => child.getClickable())].flat();

    moveRight = (x: number, y: number) => {
        //ignore
        return { x, y };
    };
    moveLeft = (x: number, y: number) => {
        //ignore
        return { x, y };
    };
    moveDown = (x: number, y: number) => {
        const current = this.children[x];
        if (y > 0) {
            const next = this.children.length - 1 == x ? 0 : x + 1;
            return current.moveDown(x, y, next);
        }

        if (current.getClickable().length > 1) {
            return { x, y: y + 1 };
        }

        if (this.children.length > x + 1) {
            return { x: x + 1, y: 0 };
        } else {
            return { x: 0, y: 0 };
        }
    };
    moveUp = (x: number, y: number) => {
        const current = this.children[x];
        if (y > 0) {
            const previous = x == 0 ? this.children.length : x;
            return current.moveUp(x, y, previous);
        }
        const previous = x == 0 ? this.children.length - 1 : x - 1;
        return { x: previous, y: this.children[previous].getClickable().length - 1 };
    };
    action = (xy: XY) => {
        const { x, y } = xy;
        const current = this.children[x];
        if (y > 0) {
            current.children[y - 1].onClick(xy);
        } else {
            current.onClick(xy);
        }
    };
}
