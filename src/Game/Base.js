import Hand from './Hand';

export default class Base {
    constructor(stateholder) {
        this.stateHolder = stateholder;
        this.hand = new Hand(stateholder);
    }

    state() {
        return this.stateHolder.state;
    }

    filterNotEqual(stack, card) {
        return stack.filter((value, index, arr) => {
            return value.face !== card.props.face || value.type.icon !== card.props.type.icon;
        });
    }

    filterOut = (stacks, card) => {
        for (var i = 0; i < stacks.length; i++) {
            stacks[i].stack = this.filterNotEqual(stacks[i].stack, card);
        }

        return stacks;
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
            if (stack[i].face == card.props.face && stack[i].type.icon == card.props.type.icon) {
                stack[i].hidden = false;
            }
        }

        return stack;
    }

    findFollowing(card) {
        for (var i = 0; i < this.stateHolder.state.stacks.length; i++) {
            for (var j = 0; j < this.stateHolder.state.stacks[i].stack.length; j++) {
                if (card.props && this.stateHolder.state.stacks[i].stack[j].face == card.props.face && this.stateHolder.state.stacks[i].stack[j].type.icon == card.props.type.icon) {
                    console.log('FOUND STACK')
                    var following = this.stateHolder.state.stacks[i].stack.splice(j+1, this.stateHolder.state.stacks[i].stack.length-1).map(f => { return {props: f}})
                    console.log(following)
                    return following;
                }
            }
        }

        return [];
    }

    pickup = (card, cb) => {
        if (!this.hand.isHoldingCard()) {
            var following = this.findFollowing(card)
            this.removeFromAll(() =>
                this.stateHolder.setState((state, props) => {
                    state.hand.stack = [card, ...following]
                    state.hand.source = card.props.source;
                    return { ...state, currentCard: card };
                }, cb), card);
        }
    }

    unselectCard(state) {
        state.hand.stack = [];
        state.hand.source = null;
        state.currentCard = null;
        return state;
    }

    removeFromAll(cb, card) {
        var c = card || this.hand.currentCard();
        this.removeFromMainStack(() => {
            this.removeFromPlayStack(() => {
                this.removeFromBoardStacks(cb, c)
            }, c)
        }, c);
    }

    removeFromXStack = (callback, modifier, card) => {
        if (card)
            this.stateHolder.setState((state, props) => {
                state = modifier(state)
                return { ...state };
            }, () => {
                callback && callback()
            });
        else
            callback && callback()
    }

    removeFromPlayStack = (callback, card) => {
        this.removeFromXStack(callback, (state) => {
            state.playStack = this.filterNotEqual(state.playStack, card);
            return state;
        }, card);
    }

    removeFromMainStack = (callback, card) => {
        this.removeFromXStack(callback, (state) => {
            state.stack = this.filterNotEqual(state.stack, card);
            return state;
        }, card);
    }

    removeFromBoardStacks = (callback, card) => {
        this.removeFromXStack(callback, (state) => {
            state.stacks = this.filterOut(state.stacks, card);
            return state;
        }, card);
    }
}