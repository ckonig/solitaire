import Base from "./Base";

export default class MainStack extends Base {
    constructor(stateholder) {
        super(stateholder)
    }

    requestReset = () => {
        this.stateHolder.setState((state, props) => {
            state.stack = [...state.playStack].reverse().map(element => {
                return { ...element, hidden: true }
            })
            state.playStack = [];
            return { ...state };
        });
    }

    tryUncover = (card, cb) => {
        if (this.hand.isFromCurrentSource(card)) {
            cb && cb();
            return false;
        }
        this.tryUncoverInStack(card, state => {
            state.stack = this.unhideInStack(state.stack, card);
            return { ...state };
        }, cb);
    }

    click = (card) => {
        this.tryUncover(card, () => this.pickup(card));
        //@todo auto-drop card on playstack instead of picking it up
    }

}