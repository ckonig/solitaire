import Base from "./Base";

export default class PlayStack extends Base {
    constructor(stateholder) {
        super(stateholder)
    }

    click = (card) => {
        if (this.hand.isHoldingCard() && !this.hand.isCurrentCard(card)) {
            if (this.state().hand.source == 'main' || this.state().hand.source == 'play') {
                this.stateHolder.setState((state, props) => {
                    var current = state.currentCard; //@todo use hand stack card
                    var top = this.state().playStack[this.state().playStack.length - 1];
                    if (current && !top || top.face !== current.props.face || top.type.icon !== current.props.type.icon) {
                        state.playStack.push(this.hand.currentCard().props);
                    }
                    state.hand.stack = []
                    state.hand.source = null;
                    return { ...state, currentCard: null };
                });
            }
        } else if (card && !this.hand.isHoldingCard()) {
            this.pickup(card);
        }
    }

    // @todo implement blink validation for playstack
}