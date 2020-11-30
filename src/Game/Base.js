import ActionFacade from './Actions/ActionFacade';
import CardTools from './Deck/CardTools';

export default class Base {
    constructor(stateholder) {
        this.stateHolder = stateholder;
        this.hand = () => stateholder.state.hand;
        this.actions = new ActionFacade(stateholder);
    }

    state() {
        return this.stateHolder.state;
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