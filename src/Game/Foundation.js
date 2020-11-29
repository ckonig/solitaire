import Base from "./Base";

export default class Foundation extends Base {

    constructor(stateholder) {
        super(stateholder)
    }

    click = (index) => {
        if (!this.hand.isHoldingCard()) {
            //@todo allow pickup from foundation (?)
        } else {
            var currentAccepted = this.state().foundations[index].acceptedCards[this.state().foundations[index].acceptedCards.length - 1];
            if (this.state().foundations[index].icon == this.hand.currentCard().props.type.icon && currentAccepted == this.hand.currentCard().props.face) {
                this.stateHolder.setState((state, props) => {
                    if (this.hand.isHoldingCard() && state.foundations[index].stack.indexOf(this.hand.currentCard()) == -1) {
                        this.removeFromAll() //@todo remove hack
                        state.foundations[index].stack.push(this.hand.currentCard());
                        state.foundations[index].acceptedCards.pop();
                        return { ...this.unselectCard(state) };
                    } else {
                        return { ...state };
                    }
                });
            } else {
                this.blink(index);
            }
        }
    }

    blink = (index) => {
        this.toggleBlink(index, 10, () => {
            setTimeout(() => {
                this.toggleBlink(index, 0, () => { });
            }, 100);
        })
    }

    toggleBlink = (index, blinkFor, cb) => {
        this.stateHolder.setState((state, props) => {
            state.foundations[index].blinkFor = blinkFor;
            return { ...state };
        }, cb);
    }
}