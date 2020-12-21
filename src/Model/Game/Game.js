import Rating from "./Rating";
import TimeMachine from "./TimeMachine";

export default class Game {
    constructor(settings) {
        this.settings = settings;
        this.rating = new Rating(settings);
        this.timemachine = new TimeMachine();
        this.started = 0;
        this.isEnded = false;
        this.paused = false;
        this.end = 0;
        this.pauses = [];
        this.pauseStartedAt = null;
    }

    togglePause = (paused) => {
        if (this.paused == paused) {
            if (this.paused) {
                this.pauses.push(Date.now() - this.pauseStartedAt);
                this.pauseStartedAt = null;
                this.paused = false;
            } else {
                this.pauseStartedAt = Date.now();
                this.paused = true;
            }
        }
    };

    registerMove = (target, source) => {
        this.rating.registerHint(this.settings.disableHint());
        this.rating.registerMove(target, source);
        this.timemachine.registerMove(target, source);
        return true;
    };

    registerPickup = () => {
        this.timemachine.registerPickup();
        return true;
    };

    registerRecycle = () => {
        this.rating.registerHint(this.settings.disableHint());
        this.rating.registerRecycle();
        this.timemachine.registerRecycle();
        return true;
    };

    registerUncover = () => {
        this.rating.registerHint(this.settings.disableHint());
        this.rating.registerUncover();
        this.timemachine.registerUncover();
        return true;
    };

    registerBlink(on) {
        this.rating.registerBlink(on);
        this.timemachine.registerBlink(on);
        return true;
    }

    static copy = (orig) => {
        const copy = new Game(orig.settings);
        copy.started = orig.started;
        copy.timemachine = TimeMachine.copy(orig.timemachine);
        copy.rating = Rating.copy(orig.rating);
        copy.paused = orig.paused;
        return copy;
    };

    getElapsedMs = () => {
        const pauses = this.pauses.reduce((a, b) => a + b, 0)
        return (this.end || this.pauseStartedAt || Date.now()) - this.started - pauses;
    };

    getElapsed = () => {
        const padleft = (i) => ((i + "").length == 1 ? "0" + i : i);
        let msec = this.getElapsedMs();
        const hh = Math.floor(msec / 1000 / 60 / 60);
        msec -= hh * 1000 * 60 * 60;
        const mm = Math.floor(msec / 1000 / 60);
        msec -= mm * 1000 * 60;
        const ss = Math.floor(msec / 1000);
        msec -= ss * 1000;
        return hh ? hh + ":" + padleft(mm) + ":" + padleft(ss) : padleft(mm) + ":" + padleft(ss);
    };
}
