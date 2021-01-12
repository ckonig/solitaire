import Card from "../Deck/Card";
import Settings from "./Settings";

export interface AppliedRating {
    points: number;
    text: string;
    notified?: boolean;
}

export interface AppliedRatingWithId extends AppliedRating {
    id: number;
}

export default class Rating {
    settings: Settings;
    points: number;
    multiplicator: number;
    ratings: AppliedRating[];
    constructor(settings: Settings) {
        this.settings = settings;
        this.points = 0;
        this.multiplicator = 1;
        this.ratings = [];
    }

    hasNotifications = () => {
        return this.ratings.filter((r) => !r.notified).length > 0;
    };

    getNextNotification = () => {
        return this.ratings.map((r, id) => ({ ...r, id })).filter((r) => !r.notified)[0];
    };

    setNotified = (n: number) => {
        this.ratings[n].notified = true;
    };

    applyRating = (points: number, text: string) => {
        console.debug("RATING:", text);
        this.ratings.push({ points, text });
    };

    registerMove = (target: string, source: string, card: Card | null) => {
        this.registerHint(this.settings.disableHint());
        const currentMove = {
            source: source,
            target: target,
        };
        this.points += this.rateMove(currentMove, card);
    };

    registerRecycle = () => {
        this.registerHint(this.settings.disableHint());
        if (this.settings.launchSettings.drawMode == "single" && this.settings.launchSettings.recyclingMode == "infinite") {
            if (this.points > 0) {
                let diff = 0;
                if (this.points < 100) {
                    diff = this.points * -1;
                    this.points = 0;
                } else {
                    this.points -= 100;
                    diff = -100;
                }
                this.applyRating(diff, `subtract ${diff} (max 100 points) for RECYCLE`);
            }
        }
    };

    registerUncover = (card: Card | null) => {
        this.registerHint(this.settings.disableHint());
        card && card.setSuccess(5);
        this.points += 5;
        this.applyRating(5, "add 5 points for UNCOVER");
    };

    registerBlink(on: boolean) {
        if (on && this.settings.launchSettings.missPenalty) {
            this.points -= 10;
            this.applyRating(-10, "subtract 10 points for invalid action");
        }
    }

    penalize = (other: Rating) => {
        if (this.settings.launchSettings.undoPenalty) {
            const penalty = Math.pow(2, other.multiplicator);
            this.applyRating(penalty * -1, `applying penalty of ${penalty} points for UNDO`);
            this.points = Math.min(this.points, other.points) - penalty;
            this.multiplicator = other.multiplicator + 1;
        }
    };

    registerHint = (done: boolean) => {
        if (done && this.settings.launchSettings.hintPenalty) {
            this.points -= 10;
            this.applyRating(-10, `applying penalty of 10 points for HINT`);
        }
    };

    rateMove(move: { source: string; target: string }, card: Card | null) {
        const isTableau = (obj: string) => obj.substr(0, 7) == "tableau";
        const isFoundation = (obj: string) => obj.substr(0, 10) == "foundation";
        if (isTableau(move.source)) {
            if (isFoundation(move.target)) {
                this.applyRating(10, "add 10 points for MOVE tableau -> foundation");
                card && card.setSuccess(10);
                return 10;
            }
        } else if (move.source == "waste") {
            if (isFoundation(move.target)) {
                this.applyRating(10, "add 10 points for MOVE waste -> foundation");
                card && card.setSuccess(10);
                return 10;
            }
            if (isTableau(move.target)) {
                this.applyRating(5, "add 5 points for MOVE waste -> tableau");
                card && card.setSuccess(5);
                return 5;
            }
        } else if (isFoundation(move.source)) {
            if (isTableau(move.target)) {
                this.applyRating(-15, "subtract 15 points for MOVE foundation -> tableau");
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
        copy.ratings = [...orig.ratings];
        return copy;
    };
}
