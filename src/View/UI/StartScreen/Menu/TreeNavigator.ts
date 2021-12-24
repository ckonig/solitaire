import AbstractNavigator from "../Navigation/AbstractNavigator";
import { NavHandler } from "../Navigation/NavHandler";
import { XY } from "../../XY";

export class TreeNavigator extends AbstractNavigator implements NavHandler {
    moveUp: (x: number, y: number) => XY = (x, y) => {
        if (x === 0) {
            return { x: this.rows.length - 1, y: 0 };
        }

        if (y > 0) {
            return { x: x, y: y - 1 };
        }

        if (y === 0) {
            const row = this.getRow(x - 1);
            if (row.toggled) {
                return { x: x - 1, y: row.buttons.length - 1 };
            } else {
                return { x: x - 1, y: y };
            }
        }

        return { x: x - 1, y: y };
    };

    moveDown: (x: number, y: number) => XY = (x, y) => {
        const row = this.getRow(x);
        if (y === 0 && row.toggled) {
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

    moveLeft: (x: number, y: number) => XY = (x, y) => ({ x: x, y: y });

    moveRight: (x: number, y: number) => XY = (x, y) => ({ x: x, y: y });

    action: (xy: XY) => void = () => {
        const activeElement: any = document.activeElement;
        activeElement && activeElement.click();
    };
}
