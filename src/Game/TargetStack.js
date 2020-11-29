import Base from "./Base";

export default class TargetStack extends Base {

    constructor(stateholder) {
        super(stateholder)
    }

    click = (index) => {
        if (!this.hand.isHoldingCard()) {
            //@todo allow pickup from target stack (?)
        } else {
            var currentAccepted = this.state().targetStacks[index].acceptedCards[this.state().targetStacks[index].acceptedCards.length - 1];
            if (this.state().targetStacks[index].icon == this.hand.currentCard().props.type.icon && currentAccepted == this.hand.currentCard().props.face) {
                this.stateHolder.setState((state, props) => {
                    if (this.hand.isHoldingCard() && state.targetStacks[index].stack.indexOf(this.hand.currentCard()) == -1) {
                        this.removeFromAll() //@todo remove hack
                        state.targetStacks[index].stack.push(this.hand.currentCard());
                        state.targetStacks[index].acceptedCards.pop();
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
            state.targetStacks[index].blinkFor = blinkFor;
            return { ...state };
        }, cb);
    }
}