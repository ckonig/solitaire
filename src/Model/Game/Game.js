export default class Game {
    constructor() {
        this.moves = [];
        this.currentMove = null;
        this.points = 0;
        this.started = Date.now();
        this.modified = false;
        this.memorable = true;
        this.previousStates = [];
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
        this.moves.push({ ...currentMove });
        return true;
    }

    registerPickup() {
        this.modified = true;
        this.memorable = false;
    }

    popPreviousState = (id) => {
        const isRequested = this.previousStates.length - 1 == id;
        const popPrevious = () => isRequested && this.previousStates && this.previousStates.pop();
        let previous = popPrevious();
        while (previous && !previous.game.memorable) {
            previous = popPrevious();
        }
        return previous;
    };

    registerRecycle() {
        this.memorable = true;
        this.modified = true;
        this.moves.push({ source: "waste", target: "stock", card: null });
        this.points -= 100;
        if (this.points < 0) {
            this.points = 0;
        }
        console.debug("RATING: subtract 100 points for RECYCLE");
    }

    registerUncover(card) {
        this.memorable = true;
        this.modified = true;
        this.moves.push({ source: null, target: null, card: card });
        this.points += 5;
        console.debug("RATING: add 5 points for UNCOVER");
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
        console.debug("tried to rate move", move);

        return 0;
    }

    static copy = (orig, modelCopy) => {
        const copy = new Game();
        copy.moves = orig.moves;
        copy.currentMove = orig.currentMove;
        copy.points = orig.points;
        copy.started = orig.started;
        copy.modified = orig.modified;
        copy.memorable = orig.memorable;
        copy.previousStates = [...orig.previousStates].map((state) => modelCopy(state, true));
        return copy;
    };
}
