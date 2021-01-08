import Settings from "./Settings";

export default class Rating {
    settings: Settings;
    points: number;
    multiplicator: number;
    constructor(settings: Settings) {
        this.settings = settings;
        this.points = 0;
        this.multiplicator = 1;
    }

    registerMove = (target: string, source: string) => {
        this.registerHint(this.settings.disableHint());
        const currentMove = {
            source: source,
            target: target,
        };
        this.points += this.rateMove(currentMove);
    };

    registerRecycle = () => {
        this.registerHint(this.settings.disableHint());
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
        this.registerHint(this.settings.disableHint());
        this.points += 5;
        console.debug("RATING: add 5 points for UNCOVER");
    };

    registerBlink(on: boolean) {
        if (on && this.settings.launchSettings.missPenalty) {
            this.points -= 10;
            console.debug("RATING: subtract 10 points for invalid action");
        }
    }

    penalize = (other: Rating) => {
        if (this.settings.launchSettings.undoPenalty) {
            const penalty = Math.pow(2, other.multiplicator);
            console.debug(`RATING: applying penalty of ${penalty} points for UNDO`);
            this.points = Math.min(this.points, other.points) - penalty;
            this.multiplicator = other.multiplicator + 1;
        }
    };

    registerHint = (done: boolean) => {
        if (done && this.settings.launchSettings.hintPenalty) {
            this.points -= 10;
            console.debug(`RATING: applying penalty of 10 points for HINT`);
        }
    };

    rateMove(move: { source: string; target: string }) {
        const isTableau = (obj: string) => obj.substr(0, 7) == "tableau";
        const isFoundation = (obj: string) => obj.substr(0, 10) == "foundation";
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

    getTimePenalty = (start: number, end: number) => {
        const secondsToFinish = (end - start) / 1000;
        return Math.trunc(secondsToFinish / 5) * -2;
    };

    getBonusPoints = (start: number, end: number) => {
        const secondsToFinish = (end - start) / 1000;
        if (secondsToFinish < 30) {
            return 0;
        }
        return Math.round((20000 / secondsToFinish) * 35);
    };

    getTotal = (start: number, end: number) => {
        return this.points + this.getBonusPoints(start, end) - this.getTimePenalty(start, end);
    };

    static copy = (orig: Rating) => {
        const copy = new Rating(orig.settings);
        copy.points = orig.points;
        copy.multiplicator = orig.multiplicator;
        return copy;
    };
}
