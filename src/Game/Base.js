import Hand from './Hand';
import { filterOut } from './Common';

export default class Base {
    constructor(stateholder) {
        this.stateHolder = stateholder;
        this.hand = new Hand(stateholder);
    }

    state() {
        return this.stateHolder.state;
    }

    tryUncoverInStack = (card, modifier, cb) => {
        if (card.props.isHidden && card.props.canUncover) {
            this.stateHolder.setState((state, props) => {
                state = modifier(state);
                return { ...state };
            });
            return true;
        }
        return false;
    }

    tryUncover = (card, cb) => {
        if (this.state().hand.source && card.props.source == this.state().hand.source) {
            cb && cb();
            return false;
        }
        if (card.props.isHidden && card.props.canUncover) {
            this.stateHolder.setState((state, props) => {
                state.playStack = this.unhideInStack(state.playStack, card);
                state.stack = this.unhideInStack(state.stack, card);
                return { ...state };
            }, cb);
            return true;
        }
        cb && cb();
        return false;
    }

    pickup = (card) => {
        if (card && this.tryUncover(card)) {
            //
        } else if (!this.hand.isHoldingCard()) {
            this.removeFromAll(() =>
                this.stateHolder.setState((state, props) => {
                    state.hand.stack = [card]
                    state.hand.source = card.props.source;
                    return { ...state, currentCard: card };
                }), card);
        }
    }

    //@todo move to hand
    unselectCard(state) {
        state.hand.stack = [];
        state.hand.source = null;
        state.currentCard = null;
        return state;
    }

    unselect = () => {
        this.stateHolder.setState((state, props) => {
            return { ...this.unselectCard(state) };
        });
    }

    unhideInStack(stack, card) {
        for (var i = 0; i < stack.length; i++) {
            if (stack[i].face == card.props.face && stack[i].type.icon == card.props.type.icon) {
                stack[i].hidden = false;
            }
        }

        return stack;
    }

    removeFromAll(cb, card) {
        var c = card || this.state().currentCard;
        this.removeFromMainStack(() => {
            this.removeFromPlayStack(() => {
                this.removeFromBoardStacks(cb, c)
            }, c)
        }, c);
    }

    removeFromPlayStack = (callback, card) => {
        if (card)
            this.stateHolder.setState((state, props) => {
                var filtered = state.playStack.filter((value, index, arr) => {
                    return value.face !== card.props.face || value.type.icon !== card.props.type.icon;
                });

                state.playStack = filtered;
                return { ...state };
            }, () => {
                callback && callback()
            });
        else
            callback && callback()
    }

    removeFromMainStack = (callback, card) => {
        if (card)
            this.stateHolder.setState((state, props) => {
                var filtered = state.stack.filter((value, index, arr) => {
                    return value.face !== card.props.face || value.type.icon !== card.props.type.icon;
                });
                state.stack = filtered;
                return { ...state };
            }, () => {
                callback && callback()
            });
        else
            callback && callback()
    }

    removeFromBoardStacks = (callback, card) => {
        if (card)
            this.stateHolder.setState((state, props) => {
                state.stacks = filterOut(state.stacks, card);
                return { ...state };
            }, () => {
                callback && callback()
            });
        else
            callback && callback()
    }
}