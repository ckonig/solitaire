import Base from './Base';
import { CardRange } from '../Deck/CardRange';
import { filterOut } from './Common';

export default class BoardStack extends Base {
    constructor(stateholder) {
        super(stateholder)
    }

    tryUncover2 = (card, index) => {
        if (this.state().hand.source && card.props.source == this.state().hand.source) {
            return false;
        }
        this.tryUncoverInStack(card, state => {
            state.stacks[index].stack = this.unhideInStack([...state.stacks[index].stack], card);
            return { ...state };
        });
    }

    validateBoardStackMove = (current, top) => {
        var range = [...CardRange];
        var currentIndex = range.indexOf(current.props.face);
        var topIndex = range.indexOf(top.props.face);
        return (currentIndex + 1) == topIndex && (current.props.type.color != top.props.type.color);
    }

    onBoardStackClick = (card, index) => {
        var stackIsEmpty = !!!card;
        if (card && this.tryUncover2(card, index)) {
            // can't put card directly onto previously hidden card
        } else if (card && !this.tryUncover2(card, index) && this.state().hand.source && card.props.source == this.state().hand.source) {
            // put back onto orignal stack
            this.stateHolder.setState((state, props) => {
                if (this.hand.isHoldingCard() && !this.hand.containsCurrentCard(this.state().stacks[index].stack)) {
                    state.stacks = filterOut(state.stacks, this.state().currentCard)
                    state.stacks[index].stack.push(state.currentCard.props);
                    return { ...state };
                }
            }, this.unselect);
        } else if (card && this.hand.isHoldingCard() && !this.hand.isCurrentCard(card)) {
            if (this.validateBoardStackMove(this.state().currentCard, card)) {
                this.stateHolder.setState((state, props) => {
                    if (this.hand.isHoldingCard() && !this.hand.containsCurrentCard(this.state().stacks[index].stack)) {
                        state.stacks = filterOut(state.stacks, this.state().currentCard)
                        state.stacks[index].stack.push(state.currentCard.props);
                        return { ...state };
                    }
                }, this.unselect);
            } else {
                this.blinkBoardStack(index);
            }
        } else if (stackIsEmpty && this.hand.isHoldingKing()) {
            this.stateHolder.setState((state, props) => {
                if (this.hand.isHoldingCard() && !this.hand.containsCurrentCard(this.state().stacks[index].stack)) {
                    this.removeFromPlayStack();
                    this.removeFromMainStack();
                    state.stacks = filterOut(state.stacks, this.state().currentCard)
                    state.stacks[index].stack.push(this.hand.currentCard().props);
                    state.hand.stack = []
                    return { ...state, currentCard: null };
                }
            }, this.unselect);
        }

        this.pickup(card);
    }

    toggleBlinkBoardStack(index, blinkFor, cb) {
        this.stateHolder.setState((state, props) => {
            state.stacks[index].blinkFor = blinkFor;
            return { ...state };
        }, cb);
    }

    blinkBoardStack = (index) => {
        this.toggleBlinkBoardStack(index, 10, () => {
            setTimeout(() => {
                this.toggleBlinkBoardStack(index, 0, () => { });
            }, 100);
        });
    }
}