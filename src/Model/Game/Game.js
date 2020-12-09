import Card from "../Deck/Card";

export default class Game {
    constructor() {
        this.points = 0;
        this.started = Date.now();
        this.previousStates = [];
        this.memorable = true;
        this.modified = false;
        this.multiplicator = 1;
    }

    registerMove(target, source) {
        this.memorable = true;
        this.modified = true;
        const currentMove = {
            source: source,
            target: target,
        };
        if (source == target) {
            this.memorable = false;
        }

        this.points += this.rateMove(currentMove);
        return true;
    }

    stackEquals(a, b) {
        return a.stack.every((card, i) => Card.equals(card, b.stack[i]) && card.isHidden == b.stack[i].isHidden);
    }

    stacksEqual(a, b) {
        return a.stacks.every((stack, i) => this.stackEquals(stack, b.stacks[i]));
    }

    modelEquals(a, b) {
        return (
            this.stackEquals(a.stock, b.stock) &&
            this.stackEquals(a.waste, b.waste) &&
            this.stacksEqual(a.tableau, b.tableau) &&
            this.stacksEqual(a.foundation, b.foundation)
        );
    }

    pushPreviousState(state) {
        const previous = this.previousStates[this.previousStates.length - 1];
        if (!previous || !this.modelEquals(state, previous)) {
            this.previousStates.push(state);
        }
    }

    registerPickup() {
        this.modified = true;
        this.memorable = false;
        return true;
    }

    popPreviousState = (id, current) => {
        const isRequested = this.previousStates.length - 1 == id;
        const popPrevious = () => isRequested && this.previousStates && this.previousStates.pop();
        let previous = popPrevious();
        while (previous && (!previous.game.memorable || this.modelEquals(previous, current)) && this.previousStates.length) {
            previous = popPrevious();
        }
        if (previous && previous.game) {
            previous.game.points = Math.min(previous.game.points, this.points) - Math.pow(2, this.multiplicator);
            previous.game.multiplicator = this.multiplicator + 1;
        }
        return previous;
    };

    registerRecycle() {
        this.memorable = true;
        this.modified = true;
        if (this.points > 0) {
            if (this.points < 100) {
                this.points = 0;
            } else {
                this.points -= 100;
            }
        }
        console.debug("RATING: subtract (max) 100 points for RECYCLE");
    }

    registerUncover() {
        this.memorable = true;
        this.modified = true;
        this.points += 5;
        console.debug("RATING: add 5 points for UNCOVER");
        return true;
    }

    registerBlink() {
        this.modified = true;
        this.memorable = false;
        return true;
    }

    rateMove(move) {
        const sourceIsTableau = move.source.substr(0, 7) == "tableau";
        const targetIsTableau = move.target.substr(0, 7) == "tableau";
        const sourceIsFoundation = move.source.substr(0, 10) == "foundation";
        const targetIsFoundation = move.target.substr(0, 10) == "foundation";
        if (sourceIsTableau) {
            if (targetIsFoundation) {
                console.debug("RATING: add 10 points for MOVE tableau -> foundation");
                return 10;
            }
        } else if (move.source == "waste") {
            if (targetIsFoundation) {
                console.debug("RATING: add 10 points for MOVE waste -> foundation");
                return 10;
            }
            if (targetIsTableau) {
                console.debug("RATING: add 5 points for MOVE waste -> tableau");
                return 5;
            }
        } else if (sourceIsFoundation) {
            if (targetIsTableau) {
                console.debug("RATING: subtract 15 points for MOVE foundation -> tableau");
                return -15;
            }
        }

        return 0;
    }

    static copy = (orig) => {
        const copy = new Game();
        copy.points = orig.points;
        copy.started = orig.started;
        copy.modified = orig.modified;
        copy.multiplicator = orig.multiplicator;
        copy.memorable = orig.memorable;
        copy.previousStates = [...orig.previousStates];
        return copy;
    };
}
