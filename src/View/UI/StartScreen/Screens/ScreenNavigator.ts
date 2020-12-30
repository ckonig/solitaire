import { XY } from "../../XY";
import { NavHandler } from "../../NavHandler";

export class ScreenNavigator implements NavHandler {
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
        const rows = this.getRows();
        if (y == 0) {
            return this.goToRow({ x: x, y: rows.length - 1 });
        }
        return this.goToRow({ x: x, y: y - 1 });
    };
    moveDown: (x: number, y: number) => XY = (x: number, y: number) => {
        const rows = this.getRows();
        if (y == rows.length - 1) {
            return this.goToRow({ x: x, y: 0 });
        }
        return this.goToRow({ x: x, y: y + 1 });
    };
    moveLeft: (x: number, y: number) => XY = (x: number, y: number) => {
        const row = this.getRow(y);
        if (x == 0) {
            return { x: row.buttons.length - 1, y: y };
        }
        return { x: x - 1, y: y };
    };
    moveRight: (x: number, y: number) => XY = (x: number, y: number) => {
        const row = this.getRow(y);
        if (x == row.buttons.length - 1) {
            return { x: 0, y: y };
        }
        return { x: x + 1, y: y };
    };
    action: (xy: XY) => void = () => {
        const activeElement: any = document.activeElement;
        activeElement && activeElement.click();
    };
}


