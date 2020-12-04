export default class Game {
    constructor() {
        this.moves = [];
        this.currentMove = null;
        this.points = 0;
        this.started = Date.now();
    }

    registerMove(target, card) {
        const currentMove = {
            source: card.source,
            card: card,
            target: target,
        };

        this.points += this.rateMove(currentMove);
        this.moves.push({ ...currentMove });
        return true;
    }

    registerRecycle() {
        this.moves.push({ source: "waste", target: "stock", card: null });
        this.points -= 100;
        if (this.points < 0) {
            this.points = 0;
        }
        console.debug("RATING: subtract 100 points for RECYCLE");
    }

    registerUncover(card) {
        this.moves.push({ source: null, target: null, card: card });
        this.points += 5;
        console.debug("RATING: add 5 points for UNCOVER");
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
}
