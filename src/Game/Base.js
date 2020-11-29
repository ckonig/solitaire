import ActionFacade from './Actions/ActionFacade';
import Hand from './Hand';

export default class Base {
    constructor(stateholder) {
        this.stateHolder = stateholder;
        this.hand = new Hand(stateholder);
        this.actions = new ActionFacade(stateholder);
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
            if (this.cardEquals(stack[i], card.props) && stack[i].hidden) {
                stack[i].hidden = false;
                this.actions.registerUncover(card);
            }
        }

        return stack;
    }

    pickup = (card, remove, cb) => {
        if (!this.hand.isHoldingCard()) {
            var following = this.findFollowing(card)
            remove(() =>
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
                    return this.stateHolder.state.stacks[i].stack.splice(j + 1, this.stateHolder.state.stacks[i].stack.length - 1).map(f => { return { props: f } })
                }
            }
        }

        return [];
    }

    //@todo move to hand?
    unselectCard(state) {
        state.hand.stack = [];
        state.hand.source = null;
        state.currentCard = null; // @todo remove currentCard
        return state;
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
}