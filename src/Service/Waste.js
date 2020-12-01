import Base from "./Base";
import CardTools from "../Model/Deck/CardTools";

//@todo model to clean up code
export default class Waste extends Base {
    pickup(card) {
        this.stateHolder.setState(
            (state) => {
                if (!state.hand.isHoldingCard()) {
                    state.hand.pickUp([card], card.props.source);
                    state.waste.filterOut(card);
                }
                return { ...state };
            },
            () => this.actions.startMove('waste', card))
    }

    tryPutDown() {
        if (this.state().hand.source == 'waste') {
            this.stateHolder.setState(
                (state) => {
                    state.waste.tryPutDown(state.hand.currentCard()) && state.hand.putDown();
                    return { ...state };
                },
                () => this.actions.endMove('waste'));
        } else {
            // @todo implement blink validation for waste
        }
    }
}   