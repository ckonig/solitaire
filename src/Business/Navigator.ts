import BusinessModel from "./BusinessModel";
import Card from "../Model/Deck/Card";
import { IStack } from "../Model/Game/IStack";
import Model from "../Model/Model";
import { StateUpdater } from "../Common";

interface NavIndex {
    x: number;
    y: number;
    z: number;
}

export default class Navigator {
    model: Model;
    currentIndex: NavIndex;
    rows: IStack[][];
    constructor(model: Model) {
        this.model = model;
        this.currentIndex = { x: 0, y: 0, z: 0 };
        this.rows = [[this.model.stock, this.model.waste, undefined, ...this.model.foundation.stacks], [...this.model.tableau.stacks]];
    }

    getZindex = (elem: IStack, card: Card) => {
        const targets = elem.getClickable();
        for (let i = 0; i < targets.length; i++) {
            if (Card.equals(card, targets[i])) {
                return i;
            }
        }
        return 0;
    };

    update = (pos: string, card: Card) => {
        for (let i = 0; i < this.rows.length; i++) {
            const row = this.rows[i];
            for (let j = 0; j < row.length; j++) {
                const elem = row[j];
                if (elem && elem.source == pos) {
                    const zIndex = this.getZindex(elem, card);
                    this.currentIndex = { x: j, y: i, z: zIndex };
                    this.finishNav();
                    return;
                }
            }
        }
    };

    valid = (pos: NavIndex) => pos.x === this.currentIndex.x && pos.y === this.currentIndex.y && pos.z === this.currentIndex.z;

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
            this.currentIndex.z = this.current().getClickable().length - 1;
            this.finishNav();
        }
    };

    moveUp = (pos: NavIndex) => {
        if (!this.valid(pos)) {
            return;
        }
        const clickable = this.current().getClickable();
        if (clickable.length && this.currentIndex.z > 0) {
            this.currentIndex.z--;
            this.finishNav();
        } else {
            this.toggleRow(true);
        }
    };

    moveDown = (pos: NavIndex) => {
        if (!this.valid(pos)) {
            return;
        }
        const clickable = this.current().getClickable();
        if (clickable.length && this.currentIndex.z < clickable.length - 1) {
            this.currentIndex.z++;
            this.finishNav();
        } else {
            this.toggleRow(false);
        }
    };

    toggleRow = (pickLast: boolean) => {
        if (this.currentIndex.y == 0) {
            this.currentIndex.y = 1;
        } else {
            this.currentIndex.y = 0;
        }
        const last = this.current() ? this.current().getClickable().length - 1 : 0;
        this.currentIndex.z = pickLast ? last : 0;
        if (this.current() == undefined) {
            this.moveLeft(this.currentIndex);
        } else {
            this.finishNav();
        }
    };

    finishNav = () => {
        const clickable = this.current().getClickable();
        if (clickable && clickable[this.currentIndex.z]) {
            this.model.focus.setCard(clickable[this.currentIndex.z]);
        } else {
            this.model.focus.setStack(this.current().source);
        }
    };

    current = () => {
        return this.rows[this.currentIndex.y][this.currentIndex.x];
    };

    pressCurrent = () => {
        if (this.model.focus.card) {
            return this.model.focus.card.onClick({ isKeyboard: true });
        } else if (this.model.focus.stack) {
            return this.current().clickEmpty({ isKeyboard: true });
        } else {
            return (ctx: BusinessModel) => {
                ctx.navigator.finishNav();
            };
        }
    };
}
