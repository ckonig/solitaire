import Base from "./Base";
import CardTools from "../Deck/CardTools";

export default class Waste extends Base {
    _tryPutBackToWaste() {
        if (this.state().hand.source == 'waste') {
            this.stateHolder.setState((state, props) => {
                var current = this.hand().currentCard();
                var top = this.state().waste[this.state().waste.length - 1];
                if (current && current.props && (!top || top.face !== current.props.face || top.type.icon !== current.props.type.icon)) {
                    state.waste.push(this.hand().currentCard().props);
                }
                state.hand.putDown();
                return { ...state };
            }, () => {
                this.actions.endMove('waste');
            });
        } else {
            // @todo implement blink validation for waste
        }
    }

    _pickup(card) {
        this.stateHolder.setState((state) => {
            if (!state.hand.isHoldingCard()) {
                state.hand.pickUp([card], card.props.source);
                state.waste = CardTools.filterNotEqual(state.waste, card);
            }
            return { ...state };
        }, () => this.actions.startMove('waste', card.props))
    }
}