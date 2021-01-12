/* eslint-disable no-unused-vars */

import Card from "../Deck/Card";
import FoundationStack from "./FoundationStack";
import Hand from "./Hand";
import MultiStack from "./MultiStack";
import Settings from "./Settings";
import Suits from "../Deck/Suits";

export default class Foundation extends MultiStack<FoundationStack> {
    constructor(settings: Settings, hand: Hand) {
        super(settings, hand, [
            ...Object.keys(Suits)
                .map((key: string) => Suits[key])
                .map((suit, index) => new FoundationStack("foundation-" + index, hand, suit)),
        ]);
    }

    setOnClick = (onClick: (c: any, p: any, index: number) => (s: any) => void) => {
        this.stacks.forEach((stack, index) => {
            stack.setOnClick((c: any, p: any) => onClick(c, p, index), this.hand);
        });
    };

    getCurrentAccepted = (index: number) => {
        return this.stacks[index].getCurrentAccepted();
    };

    wouldAcceptHand = (index: number) => !this.hand.hasMoreThanOneCard() && this.accepts(index, this.hand.currentCard());

    putDownHand = (index: number) => this.add(index, this.hand.putDown());

    accepts = (index: number, card: Card | null) => {
        return this.stacks[index].accepts(card);
    };

    add = (index: number, cards: Card[]) => {
        const card = cards[0];
        card.causeEntropy(Math.min(this.settings.interactionEntropy, 3));
        card.source = this.stacks[index].source;
        this.stacks[index].stack.push(card);
        return this.stacks[index].usedCards.push(this.stacks[index].acceptedCards.pop());
    };

    remove = (index: number, card: Card) => {
        this.stacks[index].acceptedCards.push(this.stacks[index].usedCards.pop());
        return (card && card.equals(this.getTop(index)) && this.stacks[index].stack.pop()) || null;
    };

    getPreviousUsed = (index: number) => [...this.stacks[index].usedCards].pop();

    countCards = () => this.stacks.map((f) => f.stack.length).reduce((a, b) => a + b, 0);

    getTop = (index: number) => this.stacks[index].stack[this.stacks[index].stack.length - 1];

    static copy = (orig: Foundation, hand: Hand) => {
        const copy = new Foundation(orig.settings, hand);
        copy.stacks = orig.stacks.map((origStack) => {
            const s = new FoundationStack(origStack.source, hand, origStack);
            s.stack = Card.copyAll(origStack.stack);
            s.acceptedCards = [...origStack.acceptedCards];
            s.usedCards = [...origStack.usedCards];
            s.icon = origStack.icon;
            s.color = origStack.color;
            return s;
        });
        return copy;
    };

    setEntropy = (lvl: number) => {
        this.stacks.forEach((stack) => stack.stack.forEach((element) => element.causeEntropy(Math.min(3, lvl))));
        return this;
    };
}
