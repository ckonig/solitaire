import { XY } from "../../XY";

export default class AbstractNavigator {
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
}
