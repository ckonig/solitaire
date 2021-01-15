import Card from "../Deck/Card";
import { IStack } from "./Stack";
import Model from "../Model";

export default class TimeMachine {
    previousStates: Model[];
    memorable: boolean;
    modified: boolean;
    constructor() {
        this.previousStates = [];
        this.memorable = true;
        this.modified = false;
    }

    registerMove = (target: string, source: string) => {
        this.memorable = true;
        this.modified = true;

        if (source === target) {
            this.memorable = false;
        }
    };

    pushPreviousState = (state: any) => {
        const previous = this.previousStates[this.previousStates.length - 1];
        if (!previous || !this.modelEquals(state, previous)) {
            this.previousStates.push(state);
        }
    };

    registerPickup = () => {
        this.modified = true;
        this.memorable = false;
    };

    popPreviousState = (id: number, current: any) => {
        const isRequested = this.previousStates.length - 1 === id;
        const popPrevious = () => isRequested && this.previousStates && this.previousStates.pop();
        let previous = popPrevious();
        while (previous && (!previous.game.timemachine.memorable || this.modelEquals(previous, current)) && this.previousStates.length) {
            previous = popPrevious();
        }
        return previous;
    };

    registerRecycle = () => {
        this.memorable = true;
        this.modified = true;
    };

    registerUncover = () => {
        this.memorable = true;
        this.modified = true;
        return true;
    };

    registerBlink(on: boolean) {
        if (on) {
            this.modified = true;
            this.memorable = false;
        }
    }

    stackEquals = (a: IStack, b: IStack) => {
        return a.stack.every((card, i) => Card.equals(card, b.stack[i]) && card.isHidden === b.stack[i].isHidden);
    };

    stacksEqual = (a: { stacks: IStack[] }, b: { stacks: IStack[] }) => {
        return a.stacks.every((stack, i) => this.stackEquals(stack, b.stacks[i]));
    };

    modelEquals = (a: Model, b: Model) => {
        return (
            this.stackEquals(a.stock, b.stock) &&
            this.stackEquals(a.waste, b.waste) &&
            this.stacksEqual(a.tableau, b.tableau) &&
            this.stacksEqual(a.foundation, b.foundation)
        );
    };

    static copy = (orig: TimeMachine) => {
        const copy = new TimeMachine();
        copy.previousStates = [...orig.previousStates];
        copy.memorable = orig.memorable;
        copy.modified = orig.modified;
        return copy;
    };
}
