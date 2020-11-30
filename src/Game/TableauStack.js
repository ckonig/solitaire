import Base from './Base';
import { CardRange } from './Deck/CardRange';

export default class TableauStack extends Base {
    constructor(stateholder) {
        super(stateholder)
    }

    tryUncover = (card, index) => {
        if (this.hand().isFromCurrentSource(card)) {
            return false;
        }
        return this.tryUncoverInStack(card, state => {
            state.tableau.stacks[index].stack = this.unhideInStack([...state.tableau.stacks[index].stack], card);
            return { ...state };
        });
    }

    validateTableauStackMove = (current, top) => {
        // @todo this is different from acceptedCards in foundation although they are very similar -> fix inconsistency
        var range = [...CardRange];
        var currentIndex = range.indexOf(current.props.face);
        var topIndex = range.indexOf(top.props.face);
        return (currentIndex + 1) == topIndex && (current.props.type.color != top.props.type.color);
    }

    click = (card, index, source) => {
        var stackIsEmpty = !!!card;
        if (card) {
            if (this.tryUncover(card, index)) {
                // can't put card directly onto previously hidden card
            } else if (!this.tryUncover(card, index) && this.hand().isFromCurrentSource(card)) {
                this.tryPutOntoStack(index)
            } else if (this.hand().isHoldingCard() && !this.hand().isCurrentCard(card)) {
                if (this.validateTableauStackMove(this.hand().currentCard(), card)) {
                    this.tryPutOntoStack(index)
                } else {
                    this.blink(index);
                }
            } else {
                this._pickup(card)
            }
        }
        else if (stackIsEmpty && (this.hand().isHoldingKing() || this.hand().isFromCurrentSource({ props: { source: source } }))) {
            this.tryPutOntoStack(index)
        }
    }

    _pickup = (card) => {
        this.stateHolder.setState((state) => {
            if (!state.hand.isHoldingCard()) {
                var following = state.tableau.findFollowing(card)
                state.hand.pickUp([card, ...following], card.props.source);
            }
            return { ...state };
        }, () => this._removeFromTableauStacks(card, () => this.actions.startMove(card.props.source, card.props)))
    }

    _removeFromTableauStacks = (card, callback) => {
        this.removeFromXStack(callback, (state) => {
            state.tableau.filterOut(card);
            return state;
        }, card);
    }

    tryPutOntoStack = (index) => {
        this.stateHolder.setState((state) => {
            if (state.hand.isHoldingCard() && !state.hand.containsCurrentCard(state.tableau.stacks[index].stack)) {
                state.tableau.filterOut(state.hand.currentCard())
                state.tableau.stacks[index].stack.push(...state.hand.putDown().map(e => e.props));
                return { ...state };
            }
        }, () => this.actions.endMove("tableau-" + index));
    }

    //@todo move to model and/or component
    blink = (index) => this.toggleBlink(index, 10, () => setTimeout(() => this.toggleBlink(index, 0), 100))

    toggleBlink(index, blinkFor, cb) {
        this.stateHolder.setState((state) => {
            state.tableau.stacks[index].blinkFor = blinkFor;
            return { ...state };
        }, cb);
    }
}
