export default class Rating {
    constructor(settings) {
        this.settings = settings;
        this.points = 0;
        this.multiplicator = 1;
    }

    registerMove = (target, source) => {
        const currentMove = {
            source: source,
            target: target,
        };
        this.points += this.rateMove(currentMove);
    };

    registerRecycle = () => {
        if (this.settings.launchSettings.drawMode == "single" && this.settings.launchSettings.recyclingMode == "infinite") {
            if (this.points > 0) {
                if (this.points < 100) {
                    this.points = 0;
                } else {
                    this.points -= 100;
                }
            }
            console.debug("RATING: subtract (max) 100 points for RECYCLE");
        }
    };

    registerUncover = () => {
        this.points += 5;
        console.debug("RATING: add 5 points for UNCOVER");
    };

    registerBlink(on) {
        if (on && this.settings.launchSettings.missPenalty) {
            this.points -= 10;
            console.debug("RATING: subtract 10 points for invalid action");
        }
    }

    penalize = (other) => {
        if (this.settings.launchSettings.undoPenalty) {
            const penalty = Math.pow(2, other.multiplicator);
            console.debug(`RATING: applying penalty of ${penalty} points for UNDO`);
            this.points = Math.min(this.points, other.points) - penalty;
            this.multiplicator = other.multiplicator + 1;
        }
    };

    registerHint = (done) => {
        if (done && this.settings.launchSettings.hintPenalty) {
            this.points -= 10;
            console.debug(`RATING: applying penalty of 10 points for HINT`);
        }
    };

    rateMove(move) {
        const isTableau = (obj) => obj.substr(0, 7) == "tableau";
        const isFoundation = (obj) => obj.substr(0, 10) == "foundation";
        if (isTableau(move.source)) {
            if (isFoundation(move.target)) {
                console.debug("RATING: add 10 points for MOVE tableau -> foundation");
                return 10;
            }
        } else if (move.source == "waste") {
            if (isFoundation(move.target)) {
                console.debug("RATING: add 10 points for MOVE waste -> foundation");
                return 10;
            }
            if (isTableau(move.target)) {
                console.debug("RATING: add 5 points for MOVE waste -> tableau");
                return 5;
            }
        } else if (isFoundation(move.source)) {
            if (isTableau(move.target)) {
                console.debug("RATING: subtract 15 points for MOVE foundation -> tableau");
                return -15;
            }
        }

        return 0;
    }

    getTimePenalty = (start, end) => {
        const secondsToFinish = (end - start) / 1000;
        return Math.trunc(secondsToFinish / 5) * -2;
    };

    getBonusPoints = (start, end) => {
        const secondsToFinish = (end - start) / 1000;
        if (secondsToFinish < 30) {
            return 0;
        }
        return Math.round((20000 / secondsToFinish) * 35);
    };

    getTotal = (start, end) => {
        return this.points + this.getBonusPoints(start, end) - this.getTimePenalty(start, end);
    }

    static copy = (orig) => {
        const copy = new Rating(orig.settings);
        copy.points = orig.points;
        copy.multiplicator = orig.multiplicator;
        return copy;
    };
}
