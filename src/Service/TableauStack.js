import { CardRange } from '../Model/Deck/CardRange';
import Service from './BaseService';

export default class TableauStack extends Service {

    click = (card, index, source) => card
        ? this.clickCard(card, index)
        : this.clickEmpty(source, index)

    clickCard(card, index) {
        if (this.hand().isHoldingCard()) {
            if (!this.tryUncover(card, index) && this.hand().isFromCurrentSource(card) && card.isHidden) {
                this.tryPutDown(index)
            } else if (this.validateTableauStackMove(this.hand().currentCard(), card)) {
                this.tryPutDown(index)
            } else {
                this.blink(index);
            }
        } else if (!this.tryUncover(card, index)) {
            this.pickup(card)
        }
    }

    clickEmpty(source, index) {
        //@todo check if model is really empty (shadow bug)
        if (this.hand().isHoldingKing() || this.hand().source == source) {
            this.tryPutDown(index)
        } 
    }

    validateTableauStackMove = (current, top) => {
        // @todo this is different from acceptedCards in foundation although they are very similar -> fix inconsistency
        var range = [...CardRange];
        var currentIndex = range.indexOf(current.face);
        var topIndex = range.indexOf(top.face);
        return (currentIndex + 1) == topIndex && (current.type.color != top.type.color);
    }

    pickup = (card) => {
        this._setState((state) => {
            if (!state.hand.isHoldingCard() && !card.isHidden) {
                var following = state.tableau.findFollowing(card)
                state.hand.pickUp([card, ...following], card.source);
                state.tableau.filterOut([card, ...following]);
            }
        });
    }

    tryPutDown = (index) => {
        this._setState((state) => {
            if (state.hand.isHoldingCard() && !state.hand.containsCurrentCard(state.tableau.stacks[index].stack)) {
                state.tableau.filterOut([state.hand.currentCard()])
                this.actions.registerMove('tableau-' + index, state, state.hand.currentCard())
                state.tableau.add(index, state.hand.putDown());
            }
        });
    }

    tryUncover = (card, index) => {
        if (!this.hand().isHoldingCard() && card.isHidden && card.canUncover) {
            this._setState((state) => {
                state.tableau.uncover(index, card) && this.actions.registerUncover(card, state);
            });
            return true;
        }
        return false
    }

    blink = (index) => this._blink(s => s.tableau.stacks[index])

}
