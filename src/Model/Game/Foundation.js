import Card from "../Deck/Card";
import Suits from "../Deck/Suits";
import { getFoundationOrder } from "../Deck/DeckSize";

export default class Foundation {
    constructor(settings) {
        this.settings = settings;
        const template = () => ({
            stack: [],
            acceptedCards: [...getFoundationOrder()],
            usedCards: [],
            icon: null,
            color: null,
        });
        const stacks = Object.keys(Suits)
            .map((key) => Suits[key])
            .map((suit) => ({ ...template(), ...suit }));
        this.stacks = [...stacks];
        // eslint-disable-next-line no-unused-vars
        this.onClick = (a,b,c) => {}
        this.blinkFor = 0;
        this.unblink = () => {};
    }

    getStacks = () => {
        return this.stacks;
    }

    getCurrentAccepted = (index) => {
        const currentFoundation = this.stacks[index].acceptedCards;
        return currentFoundation[currentFoundation.length - 1];
    };

    wouldAccept = (index, hand) => !hand.hasMoreThanOneCard() && this.accepts(index, hand.currentCard());

    accepts = (index, card) => {
        const currentAccepted = this.getCurrentAccepted(index);
        return this.stacks[index].icon == card.type.icon && currentAccepted == card.face;
    };

    add = (index, cards) => {
        const card = cards[0];
        card.causeEntropy(Math.min(this.settings.interactionEntropy, 3));
        card.source = "foundation-" + index;
        card.suggestion = false;
        this.stacks[index].stack.push(card);
        return this.stacks[index].usedCards.push(this.stacks[index].acceptedCards.pop());
    };

    remove = (index, card) => {
        this.stacks[index].acceptedCards.push(this.stacks[index].usedCards.pop());
        return card && card.equals(this.getTop(index)) && this.stacks[index].stack.pop();
    };

    getPreviousUsed = (index) => {
        return [...this.stacks[index].usedCards].pop();
    };

    countCards = () => {
        return this.stacks.map((f) => parseInt(f.stack.length)).reduce((a, b) => a + b, 0);
    };

    getTop(index) {
        return this.stacks[index].stack[this.stacks[index].stack.length - 1];
    }

    static copy = (orig) => {
        const copy = new Foundation(orig.settings);
        copy.stacks = orig.stacks.map((origStack) => ({
            stack: Card.copyAll(origStack.stack),
            acceptedCards: [...origStack.acceptedCards],
            usedCards: [...origStack.usedCards],
            icon: origStack.icon,
            color: origStack.color,
        }));
        return copy;
    };

    setEntropy = (lvl) => {
        this.stacks.forEach((stack) => stack.stack.forEach((element) => element.causeEntropy(Math.min(3, lvl))));
        return this;
    };
}
