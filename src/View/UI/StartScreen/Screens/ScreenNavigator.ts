import AbstractNavigator from "../AbstractNavigator";
import { NavHandler } from "../../NavHandler";
import { XY } from "../../XY";

export class ScreenNavigator extends AbstractNavigator implements NavHandler {
    moveUp: (x: number, y: number) => XY = (x, y) => {
        const rows = this.getRows();
        if (y === 0) {
            return this.goToRow({ x: x, y: rows.length - 1 });
        }
        return this.goToRow({ x: x, y: y - 1 });
    };

    moveDown: (x: number, y: number) => XY = (x, y) => {
        const rows = this.getRows();
        if (y === rows.length - 1) {
            return this.goToRow({ x: x, y: 0 });
        }
        return this.goToRow({ x: x, y: y + 1 });
    };

    moveLeft: (x: number, y: number) => XY = (x, y) => {
        const row = this.getRow(y);
        if (x === 0) {
            return { x: row.buttons.length - 1, y: y };
        }
        return { x: x - 1, y: y };
    };

    moveRight: (x: number, y: number) => XY = (x, y) => {
        const row = this.getRow(y);
        if (x === row.buttons.length - 1) {
            return { x: 0, y: y };
        }
        return { x: x + 1, y: y };
    };

    action: (xy: XY) => void = () => {
        const activeElement: any = document.activeElement;
        activeElement && activeElement.click();
    };
}
