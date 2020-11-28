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

    clickMainStack = (card) => {
        this.tryUncover(card, () => this.pickup(card));
    }

    clickOnPlayStack = (card) => {
        if (this.hand.isHoldingCard() && !this.hand.isCurrentCard(card)) {
            if (this.state().hand.source == 'main' || this.state().hand.source == 'play') {
                this.stateHolder.setState((state, props) => {
                    var current = state.currentCard;
                    var top = this.state().playStack[this.state().playStack.length - 1];
                    if (current && !top || top.face !== current.props.face || top.type.icon !== current.props.type.icon) {
                        state.playStack.push(this.hand.currentCard().props);
                    }
                    state.hand.stack = []
                    state.hand.source = null;
                    return { ...state, currentCard: null };
                });
            }
        } else if (card && this.hand.isCurrentCard(card)) {
            this.unselect();
        } else if (card && !this.hand.isHoldingCard()) {
            this.pickup(card);
        }
    }
}