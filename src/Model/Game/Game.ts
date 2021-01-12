import Card from "../Deck/Card";
import Rating from "./Rating";
import Settings from "./Settings";
import TimeMachine from "./TimeMachine";

export default class Game {
    settings: Settings;
    rating: Rating;
    timemachine: TimeMachine;
    started: number;
    isEnded: boolean;
    end: number;
    paused: any;
    constructor(settings: Settings) {
        this.settings = settings;
        this.rating = new Rating(settings);
        this.timemachine = new TimeMachine();
        //@todo move to context:
        this.started = 0;
        this.isEnded = false;
        this.end = 0;
    }

    registerMove = (target: string, source: string, card: Card | null) => {
        this.rating.registerMove(target, source, card);
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

    registerUncover = (card: Card | null) => {
        this.rating.registerUncover(card);
        this.timemachine.registerUncover();
        return true;
    };

    registerBlink(on: boolean) {
        this.rating.registerBlink(on);
        this.timemachine.registerBlink(on);
        return true;
    }

    static copy = (orig: Game) => {
        const copy = new Game(orig.settings);
        copy.timemachine = TimeMachine.copy(orig.timemachine);
        copy.rating = Rating.copy(orig.rating);
        copy.paused = orig.paused;
        return copy;
    };
}
