import BasicStack from "./BasicStack";
import Card from "../Deck/Card";
import Suits from "../Deck/Suits";
import { getFoundationOrder } from "../Deck/DeckSize";

export default class Foundation {
    constructor(settings) {
        this.settings = settings;
        const template = (index) => {
            const s = new BasicStack("foundation-" + index);
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
        this.onClick = (a, b, c) => {};
        this.blinkFor = 0;
        this.unblink = () => {};
        this.suggestion = false;
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
        card.source = this.stacks[index].source;
        card.suggestion = false;
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

    static copy = (orig) => {
        const copy = new Foundation(orig.settings);
        copy.stacks = orig.stacks.map((origStack) => {
            const s = new BasicStack(origStack.source);
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
