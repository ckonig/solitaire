import Base from "./Base";

export default class Waste extends Base {

    click = (card) => {
        if (this.hand().isHoldingCard() && !this.hand().isCurrentCard(card)) {
            this.tryPutDown(card);
        } else if (card && !this.hand().isHoldingCard()) {
            this.pickup(card)
        } else {
            this.blink();
        }
    }
    
    pickup(card) {
        this._setState(
            (state) => {
                if (!state.hand.isHoldingCard()) {
                    state.hand.pickUp([card], card.props.source);
                    state.waste.filterOut(card);
                    this.actions.startMove('waste', card, state)
                }
                return { ...state };
            })
    }

    tryPutDown() {
        if (this.state().hand.source == 'waste') {
            this._setState(
                (state) => {
                    state.waste.tryPutDown(state.hand.currentCard()) && state.hand.putDown() && this.actions.endMove('waste', state)
                    return { ...state };
                });
        } else {
            this.blink();
        }
    }

    blink = () => this._blink(s => s.waste)
}   