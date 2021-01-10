import Card from "../Deck/Card";
import { IStack } from "../Game/IStack";
import Model from "../Model";

interface NavIndex {
    x: number;
    y: number;
    z: number;
}

export default class Navigator {
    model: Model;
    currentIndex: NavIndex;
    rows: (IStack | undefined)[][];
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
        const current = this.current();
        if (current == undefined) {
            this.move(this.currentIndex, direction);
        } else {
            this.currentIndex.z = current.getClickable().length - 1;
            this.finishNav();
        }
    };

    moveUp = (pos: NavIndex) => {
        if (!this.valid(pos)) {
            return;
        }
        const clickable = this.current()?.getClickable();
        if (clickable && clickable.length && this.currentIndex.z > 0) {
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
        const clickable = this.current()?.getClickable();
        if (clickable && clickable.length && this.currentIndex.z < clickable.length - 1) {
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
        const current = this.current();
        const last: number = current ? current.getClickable().length - 1 : 0;
        this.currentIndex.z = pickLast ? last : 0;
        if (!current) {
            this.moveLeft(this.currentIndex);
        } else {
            this.finishNav();
        }
    };

    finishNav = () => {
        const clickable = this.current()?.getClickable();
        if (clickable && clickable[this.currentIndex.z]) {
            this.model.focus.setCard(clickable[this.currentIndex.z]);
        } else {
            this.model.focus.setStack(this.current()?.source || "");
        }
        return true;
    };

    current = () => {
        return this.rows[this.currentIndex.y][this.currentIndex.x];
    };

    pressCurrent = () => {
        if (this.model.focus.card && this.model.focus.card.canClick()) {
            return this.model.focus.card.onClick({ isKeyboard: true });
        } else if (this.model.focus.stack) {
            return this.current()?.clickEmpty({ isKeyboard: true });
        } else {
            //trying to hack around navigation here when doing stock -> waste movement 
            //but it only works in strict mode
            //@bug in production, the focus moves with the card
            return (ctx: Model) => {
                ctx.navigator.finishNav();
                ctx.game.timemachine.modified = true;
            };
        }
    };
}
