import Service from "./BaseService";

export default class Waste extends Service {

    click = (card) => {
        if (this.hand().isHoldingCard()) {
            this.tryPutDown();
        } else if (card) {
            this.pickup(card) //@todo use model to get top card instead (shadow bug)
        } else {
            this.blink();
        }
    }

    pickup(card) {
        this._setState((state) => {
            if (!state.hand.isHoldingCard()) {
                state.hand.pickUp([card], card.source);
                state.waste.filterOut(card);
            }
        })
    }

    tryPutDown() {
        if (this.state().hand.source == 'waste') {
            this._setState((state) => {
                state.waste.tryPutDown(state.hand.currentCard())
                    && this.actions.registerMove('waste', state, state.hand.currentCard())
                    && state.hand.putDown()
            });
        } else {
            this.blink();
        }
    }

    blink = () => this._blink(s => s.waste)
}   