import Card from "../Deck/Card";
import { HandHoldingStack } from "./BasicStack";
import Suits from "../Deck/Suits";
import { getFoundationOrder } from "../Deck/DeckSize";

export default class Foundation {
    constructor(settings, hand) {
        this.settings = settings;
        this.hand = hand;
        const template = (index) => {
            const s = new HandHoldingStack("foundation-" + index, hand);
            s.stack = [];
            s.acceptedCards = [...getFoundationOrder()];
            s.usedCards = [];
            s.icon = null;
            s.color = null;
            s.blinkFor = 0;
            return s;
        };
        const stacks = Object.keys(Suits)
            .map((key) => Suits[key])
            .map((suit, index) => ({ ...template(index), ...suit }));
        this.stacks = [...stacks];
        // eslint-disable-next-line no-unused-vars
        this.blinkFor = 0;
        this.unblink = () => {};
    }

    setOnClick = (onClick) => {
        this.stacks.forEach((stack, index) => {
            stack.clickEmpty = (p) => onClick(null, p, index);
            stack.stack.forEach((card, sindex) => {
                card.onClick = (p) => onClick({ ...card }, p, index);
                card.canClick = () => sindex == stack.stack.length - 1;
            });
            this.hand.setOnClick(stack);
        });
    };

    getCurrentAccepted = (index) => {
        const currentFoundation = this.stacks[index].acceptedCards;
        return currentFoundation[currentFoundation.length - 1];
    };

    wouldAcceptHand = (index) => !this.hand.hasMoreThanOneCard() && this.accepts(index, this.hand.currentCard());

    putDownHand = (index) => this.add(index, this.hand.putDown());

    accepts = (index, card) => {
        const currentAccepted = this.getCurrentAccepted(index);
        return this.stacks[index].icon == card.type.icon && currentAccepted == card.face;
    };

    add = (index, cards) => {
        const card = cards[0];
        card.causeEntropy(Math.min(this.settings.interactionEntropy, 3));
        card.source = this.stacks[index].source;
        this.stacks[index].stack.push(card);
        return this.stacks[index].usedCards.push(this.stacks[index].acceptedCards.pop());
    };

    remove = (index, card) => {
        this.stacks[index].acceptedCards.push(this.stacks[index].usedCards.pop());
        return card && card.equals(this.getTop(index)) && this.stacks[index].stack.pop();
    };

    getPreviousUsed = (index) => [...this.stacks[index].usedCards].pop();

    countCards = () => this.stacks.map((f) => parseInt(f.stack.length)).reduce((a, b) => a + b, 0);

    getTop = (index) => this.stacks[index].stack[this.stacks[index].stack.length - 1];

    static copy = (orig, hand) => {
        const copy = new Foundation(orig.settings, hand);
        copy.stacks = orig.stacks.map((origStack) => {
            const s = new HandHoldingStack(origStack.source, hand);
            s.stack = Card.copyAll(origStack.stack);
            s.acceptedCards = [...origStack.acceptedCards];
            s.usedCards = [...origStack.usedCards];
            s.icon = origStack.icon;
            s.color = origStack.color;
            return s;
        });
        return copy;
    };

    setEntropy = (lvl) => {
        this.stacks.forEach((stack) => stack.stack.forEach((element) => element.causeEntropy(Math.min(3, lvl))));
        return this;
    };
}
