import Base from './Base';
import { CardRange } from '../Deck/CardRange';

export default class TableauStack extends Base {
    constructor(stateholder) {
        super(stateholder)
    }

    tryUncover = (card, index) => {
        if (this.hand.isFromCurrentSource(card)) {
            return false;
        }
        return this.tryUncoverInStack(card, state => {
            state.stacks[index].stack = this.unhideInStack([...state.stacks[index].stack], card);
            return { ...state };
        });
    }

    validateTableauStackMove = (current, top) => {
        var range = [...CardRange];
        var currentIndex = range.indexOf(current.props.face);
        var topIndex = range.indexOf(top.props.face);
        return (currentIndex + 1) == topIndex && (current.props.type.color != top.props.type.color);
    }

    click = (card, index, source) => {
        var stackIsEmpty = !!!card;
        if (card && this.tryUncover(card, index)) {
            // can't put card directly onto previously hidden card
        } else if (card && !this.tryUncover(card, index) && this.hand.isFromCurrentSource(card)) {
            // put back onto orignal stack
            this.tryPutOntoStack(index)
        } else if (card && this.hand.isHoldingCard() && !this.hand.isCurrentCard(card)) {
            // try put on other stack
            if (this.validateTableauStackMove(this.state().currentCard, card)) {
                this.tryPutOntoStack(index)
            } else {
                this.blink(index);
            }
        } else if (stackIsEmpty && (this.hand.isHoldingKing() || this.hand.isFromCurrentSource({ props: { source: source } }))) {
            this.stateHolder.setState((state, props) => {
                this.tryPutOntoStack(index)
            });
        } else {
            this.pickup(card);
        }
    }

    tryPutOntoStack = (index) => {
        this.stateHolder.setState((state, props) => {
            if (this.hand.isHoldingCard() && !this.hand.containsCurrentCard(this.state().stacks[index].stack)) {
                state.stacks = this.filterOut(state.stacks, this.hand.currentCard())
                state.stacks[index].stack.push(...state.hand.stack.map(e => e.props));
                return { ...this.unselectCard(state) };
            }
        });
    }

    toggleBlink(index, blinkFor, cb) {
        this.stateHolder.setState((state, props) => {
            state.stacks[index].blinkFor = blinkFor;
            return { ...state };
        }, cb);
    }

    blink = (index) => {
        this.toggleBlink(index, 10, () => {
            setTimeout(() => {
                this.toggleBlink(index, 0, () => { });
            }, 100);
        });
    }
}