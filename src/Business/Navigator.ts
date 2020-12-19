import { IStack } from "../Model/Game/IStack";
import Model from "../Model/Model";

interface NavIndex {
    x: number;
    y: number;
}
export default class Navigator {
    model: any;
    currentIndex: NavIndex;
    rows: IStack[][];
    constructor(model: Model) {
        this.model = model;
        this.currentIndex = { x: 0, y: 0 };
        this.rows = [[this.model.stock, this.model.waste, undefined, ...this.model.foundation.stacks], [...this.model.tableau.stacks]];
    }

    valid(pos: NavIndex) {
        return pos.x === this.currentIndex.x && pos.y === this.currentIndex.y;
    }

    //@todo when navigating, diable cursor-follow behaviour!

    moveLeft = (pos: NavIndex) => {
        if (!this.valid(pos)) {
            return;
        }
        if (this.currentIndex.x == 0) {
            this.currentIndex.x = 6;
        } else {
            this.currentIndex.x--;
        }
        if (this.current() == undefined) {
            this.moveLeft(this.currentIndex);
        } else {
            this.finishNav();
        }
    };

    moveRight = (pos: NavIndex) => {
        if (!this.valid(pos)) {
            return;
        }
        if (this.currentIndex.x == 6) {
            this.currentIndex.x = 0;
        } else {
            this.currentIndex.x++;
        }
        if (this.current() == undefined) {
            this.moveRight(this.currentIndex);
        } else {
            this.finishNav();
        }
    };

    moveUp = (pos: NavIndex) => {
        this.toggleRow(pos);
    };

    moveDown = (pos: NavIndex) => {
        this.toggleRow(pos);
    };

    toggleRow = (pos: NavIndex) => {
        if (!this.valid(pos)) {
            return;
        }
        if (this.currentIndex.y == 0) {
            this.currentIndex.y = 1;
        } else {
            this.currentIndex.y = 0;
        }
        if (this.current() == undefined) {
            this.moveLeft(this.currentIndex);
        } else {
            this.finishNav();
        }
    };

    finishNav = () => {
        if (this.current().stack.length) {
            this.model.focus.setCard(this.current().getTop());
        } else {
            this.model.focus.setStack(this.current().source);
        }
    };

    current = () => {
        return this.rows[this.currentIndex.y][this.currentIndex.x];
    };
}
