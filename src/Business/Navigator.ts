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

    update = (pos: string) => {
        for (let i = 0; i < this.rows.length; i++) {
            const row = this.rows[i];
            for (let j = 0; j < row.length; j++) {
                const elem = row[j];
                if (elem && elem.source == pos) {
                    this.currentIndex = { x: j, y: i };
                    this.finishNav();
                    return;
                }
            }
        }
    };

    valid = (pos: NavIndex) => pos.x === this.currentIndex.x && pos.y === this.currentIndex.y;

    moveLeft = (pos: NavIndex) =>
        this.move(pos, () => {
            this.currentIndex.x--;
            if (this.currentIndex.x == -1) {
                this.currentIndex.x = 6;
            }
        });

    moveRight = (pos: NavIndex) =>
        this.move(pos, () => {
            this.currentIndex.x++;
            if (this.currentIndex.x == 7) {
                this.currentIndex.x = 0;
            }
        });

    move = (pos: NavIndex, direction: () => void) => {
        if (!this.valid(pos)) {
            return;
        }
        direction();
        if (this.current() == undefined) {
            this.move(this.currentIndex, direction);
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
        if (this.current().getTop()) {
            this.model.focus.setCard(this.current().getTop());
        } else {
            this.model.focus.setStack(this.current().source);
        }
    };

    current = () => {
        return this.rows[this.currentIndex.y][this.currentIndex.x];
    };
}
