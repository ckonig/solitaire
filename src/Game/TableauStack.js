import Base from './Base';
import { CardRange } from './Deck/CardRange';
import CardTools from './Deck/CardTools';

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
                state.tableau.filterOut(card);
            }
            return { ...state };
        }, () => this.actions.startMove(card.props.source, card.props))
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

    tryUncover = (card, index) => {
        if (this.hand().isFromCurrentSource(card)) {
            return false;
        }
        return this.tryUncoverInStack(card, state => {
            state.tableau.stacks[index].stack = this.unhideInStack([...state.tableau.stacks[index].stack], card);
            return { ...state };
        });
    }

    tryUncoverInStack = (card, modifier, cb) => {
        if (card.props.isHidden && card.props.canUncover) {
            this.stateHolder.setState((state, props) => {
                state = modifier(state);
                return { ...state };
            }, cb);

            return true;
        }

        cb && cb();
        return false;
    }

    unhideInStack(stack, card) {
        for (var i = 0; i < stack.length; i++) {
            if (CardTools.cardEquals(stack[i], card.props) && stack[i].hidden) {
                stack[i].hidden = false;
                this.actions.registerUncover(card);
            }
        }

        return stack;
    }
}
