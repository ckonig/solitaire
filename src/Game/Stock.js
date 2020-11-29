import Base from "./Base";

export default class Stock extends Base {
    constructor(stateholder) {
        super(stateholder)
    }

    recycle = () => {
        this.stateHolder.setState((state, props) => {
            state.stock = [...state.waste].reverse().map(element => {
                return { ...element, hidden: true }
            })
            state.waste = [];
            return { ...state };
        });
    }

    tryUncover = (card, cb) => {
        if (this.hand.isFromCurrentSource(card)) {
            cb && cb();
            return false;
        }
        this.tryUncoverInStack(card, state => {
            state.stock = this.unhideInStack(state.stock, card);
            return { ...state };
        }, cb);
    }

    click = (card) => {
        this.tryUncover(card, () => this.pickup(card));
        //@todo auto-drop card on waste instead of picking it up
    }

}