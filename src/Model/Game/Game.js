import Rating from "./Rating";
import TimeMachine from "./TimeMachine";

export default class Game {
    constructor(settings) {
        this.settings = settings;
        this.rating = new Rating(settings);
        this.timemachine = new TimeMachine();
        //@todo move to context:
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

    registerBlink(on) {
        this.rating.registerBlink(on);
        this.timemachine.registerBlink(on);
        return true;
    }

    static copy = (orig) => {
        const copy = new Game(orig.settings);
        copy.timemachine = TimeMachine.copy(orig.timemachine);
        copy.rating = Rating.copy(orig.rating);
        copy.paused = orig.paused;
        return copy;
    };
}
