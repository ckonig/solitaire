import { XY } from "./Menu/Tree";
import { NavHandler } from "./NavHandler";

export class TreeNavigator implements NavHandler {
    rows: any[];
    constructor() {
        this.rows = [];
    }
    getRows = () => this.rows;
    getRow = (x: number) => this.getRows()[x];
    goToRow = (pos: XY) => {
        const rows = this.getRows();
        const row = rows[pos.y];
        if (row.buttons.length - 1 < pos.x) {
            return { ...pos, x: row.buttons.length - 1 };
        }

        return pos;
    };
    moveUp: (x: number, y: number) => XY = (x: number, y: number) => {
        if (x == 0) {
            return { x: this.rows.length - 1, y: 0 };
        }
        if (y > 0) {
            return { x: x, y: y - 1 };
        }

        if (y == 0) {
            const row = this.getRow(x - 1);
            if (row.toggled) {
                return { x: x - 1, y: row.buttons.length - 1 };
            } else {
                return { x: x - 1, y: y };
            }
        }

        return { x: x - 1, y: y };
    };
    moveDown: (x: number, y: number) => XY = (x: number, y: number) => {
        const row = this.getRow(x);
        console.debug(row);
        if (y == 0 && row.toggled) {
            return { x: x, y: 1 };
        }

        if (y > 0 && y < row.buttons.length - 1) {
            return { x: x, y: y + 1 };
        }

        if (y > 0) {
            return { x: x + 1, y: 0 };
        }

        if (x < this.rows.length - 1) {
            return { x: x + 1, y: y };
        }

        return { x: 0, y: 0 };
    };
    moveLeft: (x: number, y: number) => XY = (x: number, y: number) => {
        return { x: x, y: y };
    };
    moveRight: (x: number, y: number) => XY = (x: number, y: number) => {
        return { x: x, y: y };
    };
    action: (xy: XY) => void = () => {
        const activeElement: any = document.activeElement;
        activeElement && activeElement.click();
    };
}
