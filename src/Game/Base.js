import Hand from './Hand';

export default class Base {
    constructor(stateholder) {
        this.stateHolder = stateholder;
        this.hand = new Hand(stateholder);
    }

    state() {
        return this.stateHolder.state;
    }

    cardEquals(card, otherCard) {
        return (!card && !otherCard) || card && otherCard && otherCard.face == card.face && otherCard.type.icon == card.type.icon;
    }

    cardNotEquals(card, otherCard) {
        return otherCard.face !== card.face || otherCard.type.icon !== card.type.icon;
    }

    filterNotEqual(stack, card) {
        return stack.filter((value, index, arr) => {
            return this.cardNotEquals(value, card.props);
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

    findFollowing(card) {
        for (var i = 0; i < this.stateHolder.state.stacks.length; i++) {
            for (var j = 0; j < this.stateHolder.state.stacks[i].stack.length; j++) {
                if (card.props && this.stateHolder.state.stacks[i].stack[j].face == card.props.face && this.stateHolder.state.stacks[i].stack[j].type.icon == card.props.type.icon) {
                    console.log('FOUND STACK')
                    var following = this.stateHolder.state.stacks[i].stack.splice(j + 1, this.stateHolder.state.stacks[i].stack.length - 1).map(f => { return { props: f } })
                    console.log(following)
                    return following;
                }
            }
        }

        return [];
    }

    unselectCard(state) {
        state.hand.stack = [];
        state.hand.source = null;
        state.currentCard = null;
        return state;
    }

    removeFromAll(cb, card) {
        var c = card || this.hand.currentCard();
        this.removeFromStock(() => {
            this.removeFromWaste(() => {
                this.removeFromTableauStacks(() => {
                    this.removeFromFoundations(cb, c);
                }, c)
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

    removeFromWaste = (callback, card) => {
        this.removeFromXStack(callback, (state) => {
            state.waste = this.filterNotEqual(state.waste, card);
            return state;
        }, card);
    }

    removeFromStock = (callback, card) => {
        this.removeFromXStack(callback, (state) => {
            state.stockPile = this.filterNotEqual(state.stockPile, card);
            return state;
        }, card);
    }

    removeFromTableauStacks = (callback, card) => {
        this.removeFromXStack(callback, (state) => {
            state.stacks = this.filterOut(state.stacks, card);
            return state;
        }, card);
    }

    removeFromFoundations = (callback, card) => {
        this.removeFromXStack(callback, (state) => {
            var filtered = this.filterOut(state.foundations, card)
            console.log('filtered', state.foundations, filtered)
            state.foundations = filtered;
            return state;
        }, card);
    }
}