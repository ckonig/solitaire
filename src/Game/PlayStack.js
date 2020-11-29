import Base from "./Base";

export default class PlayStack extends Base {
    constructor(stateholder) {
        super(stateholder)
    }

    click = (card) => {
        if (this.hand.isHoldingCard() && !this.hand.isCurrentCard(card)) {
            if (this.state().hand.source == 'main' || this.state().hand.source == 'play') {
                this.stateHolder.setState((state, props) => {
                    var current = this.hand.currentCard();
                    var top = this.state().playStack[this.state().playStack.length - 1];
                    if (current && current.props && (!top || top.face !== current.props.face || top.type.icon !== current.props.type.icon)) {
                        state.playStack.push(this.hand.currentCard().props);
                    }
                    return { ...this.unselectCard(state) };
                });
            }
        } else if (card && !this.hand.isHoldingCard()) {
            this.pickup(card);
        }
    }

    // @todo implement blink validation for playstack
}