import Base from './Base';
import { CardRange } from '../Model/Deck/CardRange';

export default class TableauStack extends Base {
    constructor(stateholder) {
        super(stateholder)
    }

    validateTableauStackMove = (current, top) => {
        // @todo this is different from acceptedCards in foundation although they are very similar -> fix inconsistency
        var range = [...CardRange];
        var currentIndex = range.indexOf(current.props.face);
        var topIndex = range.indexOf(top.props.face);
        return (currentIndex + 1) == topIndex && (current.props.type.color != top.props.type.color);
    }

    pickup = (card) => {
        this.stateHolder.setState((state) => {
            if (!state.hand.isHoldingCard()) {
                var following = state.tableau.findFollowing(card)
                state.hand.pickUp([card, ...following], card.props.source);
                state.tableau.filterOut(card); 
                //@todo how come we dont need to filter the following?
            }
            return { ...state };
        }, () => this.actions.startMove(card.props.source, card))
    }

    tryPutDown = (index) => {
        this.stateHolder.setState((state) => {
            if (state.hand.isHoldingCard() && !state.hand.containsCurrentCard(state.tableau.stacks[index].stack)) {
                state.tableau.filterOut(state.hand.currentCard())
                state.tableau.stacks[index].stack.push(...state.hand.putDown().map(e => e.props));
                return { ...state };
            }
        }, () => this.actions.endMove('tableau-' + index));
    }

    tryUncover = (card, index) => {
        if (!this.hand().isFromCurrentSource(card) && card.props.isHidden && card.props.canUncover) {
            this.stateHolder.setState((state) => {
                state.tableau.uncover(index, card) && this.actions.registerUncover(card, state);
                return { ...state };
            });
            return true;
        }
        return false;
    }

    blink = (index) => this._blink(s => s.tableau.stacks[index])

}
