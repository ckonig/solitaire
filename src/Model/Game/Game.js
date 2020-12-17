import Rating from "./Rating";
import TimeMachine from "./TimeMachine";

export default class Game {
    constructor(settings) {
        this.rating = new Rating(settings);
        this.timemachine = new TimeMachine();
        this.started = 0;
        this.isEnded = false;
        this.end = 0;
    }

    registerMove = (target, source) => {
        this.rating.registerMove(target, source);
        this.timemachine.registerMove(target, source);
        return true;
    };

    registerPickup = () => {
        this.timemachine.registerPickup();
        return true;
    };

    registerRecycle = () => {
        this.rating.registerRecycle();
        this.timemachine.registerRecycle();
        return true;
    };

    registerUncover = () => {
        this.rating.registerUncover();
        this.timemachine.registerUncover();
        return true;
    };

    registerBlink() {
        this.rating.registerBlink();
        this.timemachine.registerBlink();
        return true;
    }

    static copy = (orig) => {
        const copy = new Game(orig.settings);
        copy.started = orig.started;
        copy.timemachine = TimeMachine.copy(orig.timemachine);
        copy.rating = Rating.copy(orig.rating);
        return copy;
    };

    getElapsed = () => {
        const padleft = (i) => ((i + "").length == 1 ? "0" + i : i);
        let msec = (this.end || Date.now()) - this.started;
        const hh = Math.floor(msec / 1000 / 60 / 60);
        msec -= hh * 1000 * 60 * 60;
        const mm = Math.floor(msec / 1000 / 60);
        msec -= mm * 1000 * 60;
        const ss = Math.floor(msec / 1000);
        msec -= ss * 1000;
        return hh ? hh + ":" + padleft(mm) + ":" + padleft(ss) : padleft(mm) + ":" + padleft(ss);
    };
}
