/* eslint-disable no-unused-vars */

import Suits, { Suit } from "../Deck/Suits";

import Card from "../Deck/Card";
import Hand from "./Hand";
import HandHoldingStack from "./HandHoldingStack";
import { IStack } from "./IStack";
import Settings from "./Settings";
import { XY } from "../../View/UI/XY";
import { getFoundationOrder } from "../Deck/DeckSize";

export class FoundationStack extends HandHoldingStack implements IStack {
    setOnClick: () => void = () => {};
    acceptedCards: string[] = [];
    usedCards: any[] = [];
    icon: string = "";
    color: string = "";
    blinkFor: number = 0;
    clickEmpty: (p: any) => any = () => {};
    getCurrentAccepted = () => {
        return this.acceptedCards[this.acceptedCards.length - 1];
    };
    accepts = (card: Card | null) => {
        if (!card) return false;
        const currentAccepted = this.getCurrentAccepted();
        return this.icon == card.type.icon && currentAccepted == card.face;
    };
}
export default class Foundation {
    settings: Settings;
    hand: Hand;
    stacks: FoundationStack[];
    blinkFor: number;
    unblink: () => void;
    constructor(settings: Settings, hand: Hand) {
        this.settings = settings;
        this.hand = hand;
        const template = (index: number, suit: Suit) => {
            const s = new FoundationStack("foundation-" + index, hand);
            s.stack = [];
            s.acceptedCards = [...getFoundationOrder()];
            s.usedCards = [];
            s.icon = suit.icon;
            s.color = suit.color;
            s.blinkFor = 0;
            return s;
        };
        const stacks = Object.keys(Suits)
            .map((key: string) => Suits[key])
            .map((suit, index) => (template(index, suit)));
        this.stacks = [...stacks];
        // eslint-disable-next-line no-unused-vars
        this.blinkFor = 0;
        this.unblink = () => {};
    }

    setOnClick = (onClick: (c: any, p: XY, index: number) => (s: any) => void) => {
        this.stacks.forEach((stack, index) => {
            stack.clickEmpty = (p) => onClick(null, p, index);
            stack.stack.forEach((card, sindex) => {
                card.onClick = (p: XY) => onClick({ ...card }, p, index);
                card.canClick = () => sindex == stack.stack.length - 1;
            });
            this.hand.setOnClick(stack);
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
            const s = new FoundationStack(origStack.source, hand);
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
