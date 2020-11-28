import { getDeck, getStacks, } from '../Deck/Deck';

import Base from './Base';
import BoardStack from './BoardStack';
import MainStack from './MainStack';
import TargetStack from './TargetStack';
import { getTargetOrder } from '../Deck/CardRange'

export default class Engine extends Base {
    constructor(stateholder) {
        super(stateholder)
        this.boardStack = new BoardStack(stateholder);
        this.targetStack = new TargetStack(stateholder);
        this.mainStack = new MainStack(stateholder);
    }

    getInitialState = () => {
        var deck = getDeck();
        var stack = deck.slice(0, 20);
        var board = deck.slice(20);
        var stacks = getStacks([...board]);

        var getStack = (icon) => {
            return {
                stack: [],
                acceptedCards: [...getTargetOrder()],
                icon,
            };
        };
        return {
            currentCard: null,
            stack: stack,
            playStack: [],
            targetStacks: [getStack("♥"), getStack("♦"), getStack("♣"), getStack("♠")],
            deck: board,
            stacks: stacks,
            hand: {
                stack: [],
                source: null
            },
            onBoardStackClick: this.boardStack.onBoardStackClick,
            onTargetStackClick: this.targetStack.onTargetStackClick,
            clickMainStack: this.mainStack.clickMainStack,
            pickup: this.pickup,
            clickOnPlayStack: this.mainStack.clickOnPlayStack,
            requestReset: this.mainStack.requestReset,
        };

    }
}