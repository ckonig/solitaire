import Base from "./Base";

export default class TargetStack extends Base {
    constructor(stateholder) {
        super(stateholder)
    }
    onTargetStackClick = (index) => {
        if (this.hand.isHoldingCard()) {
            if (this.state().targetStacks[index].icon == this.hand.currentCard().props.type.icon) {
                var currentAccepted = this.state().targetStacks[index].acceptedCards[this.state().targetStacks[index].acceptedCards.length - 1];
                if (currentAccepted == this.hand.currentCard().props.face) {
                    this.stateHolder.setState((state, props) => {
                        if (this.hand.isHoldingCard() && state.targetStacks[index].stack.indexOf(this.state().currentCard) == -1) {
                            this.removeFromAll()
                            state.targetStacks[index].stack.push(this.state().currentCard);
                            state.targetStacks[index].acceptedCards.pop();
                        }

                        return { ...this.unselectCard(state) };
                    });
                } else {
                    this.blinkTargetStack(index);
                }
            } else {
                this.blinkTargetStack(index);
            }
        } else {
            //@todo allow pickup from target stack (?)
        }
    }

    toggleBlinkTargetStack = (index, blinkFor, cb) => {
        this.stateHolder.setState((state, props) => {
            state.targetStacks[index].blinkFor = blinkFor;
            return { ...state };
        }, cb);
    }

    blinkTargetStack = (index) => {
        this.toggleBlinkTargetStack(index, 10, () => {
            setTimeout(() => {
                this.toggleBlinkTargetStack(index, 0, () => { });
            }, 100);
        })
    }
}