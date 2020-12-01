import Base from './Base';
import { CardRange } from '../Model/Deck/CardRange';
import CardTools from '../Model/Deck/CardTools';

//@todo this class is too messy 

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
                state.tableau.filterOut(card); //@todo how come we dont need to filter the following?
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

    //@todo move to model and/or component
    blink = (index) => this.toggleBlink(index, 10, () => setTimeout(() => this.toggleBlink(index, 0), 100))

    toggleBlink(index, blinkFor, cb) {
        this.stateHolder.setState((state) => {
            state.tableau.stacks[index].blinkFor = blinkFor;
            return { ...state };
        }, cb);
    }

    tryUncover = (card, index) => !this.hand().isFromCurrentSource(card) && this.tryUncoverInStack(card, index, () => this.actions.registerUncover(card));

    tryUncoverInStack = (card, index, cb) => {
        if (card.props.isHidden && card.props.canUncover) {
            this.stateHolder.setState((state, props) => {
                state.tableau.stacks[index].stack = this.uncoverInStack([...state.tableau.stacks[index].stack], card);
                return { ...state };
            }, cb);

            return true;
        }

        return false;
    }

    uncoverInStack(stack, card) {
        for (var i = 0; i < stack.length; i++) {
            if (CardTools.cardEquals(stack[i], card.props) && stack[i].hidden) {
                stack[i].hidden = false;
            }
        }

        return stack;
    }
}
