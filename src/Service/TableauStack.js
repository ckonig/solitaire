import Base from './Base';
import { CardRange } from '../Model/Deck/CardRange';

export default class TableauStack extends Base {
    click = (card, index, source) => {
        if (card) {
            if (this.hand().isHoldingCard()) {
                if (!this.tryUncover(card, index) && this.hand().isFromCurrentSource(card)) {
                    this.tryPutDown(index)
                } else if (this.validateTableauStackMove(this.hand().currentCard(), card)) {
                    this.tryPutDown(index)
                } else {
                    this.blink(index);
                }
            } else if (!this.tryUncover(card, index)) {
                this.pickup(card)
            }
        } else {
            if (this.hand().isHoldingKing() || this.hand().source == source) {
                this.tryPutDown(index)
            } else {
                this.blink(index);
            }
        }
    }

    validateTableauStackMove = (current, top) => {
        // @todo this is different from acceptedCards in foundation although they are very similar -> fix inconsistency
        var range = [...CardRange];
        var currentIndex = range.indexOf(current.props.face);
        var topIndex = range.indexOf(top.props.face);
        return (currentIndex + 1) == topIndex && (current.props.type.color != top.props.type.color);
    }

    pickup = (card) => {
        this._setState((state) => {
            if (!state.hand.isHoldingCard()) {
                var following = state.tableau.findFollowing(card)
                state.hand.pickUp([card, ...following], card.props.source);
                //@todo how come we dont need to filter the following?
                state.tableau.filterOut(card);
                this.actions.startMove(card.props.source, card, state)
            }
            return { ...state };
        });
    }

    tryPutDown = (index) => {
        this._setState((state) => {
            if (state.hand.isHoldingCard() && !state.hand.containsCurrentCard(state.tableau.stacks[index].stack)) {
                state.tableau.filterOut(state.hand.currentCard())
                state.tableau.stacks[index].stack.push(...state.hand.putDown().map(e => e.props));
                this.actions.endMove('tableau-' + index, state)
                return { ...state };
            }
        });
    }

    tryUncover = (card, index) => {
        if (!this.hand().isFromCurrentSource(card) && card.props.isHidden && card.props.canUncover) {
            this._setState((state) => {
                state.tableau.uncover(index, card) && this.actions.registerUncover(card, state);
                return { ...state };
            });
            return true;
        }
        return false;
    }

    blink = (index) => this._blink(s => s.tableau.stacks[index])

}
