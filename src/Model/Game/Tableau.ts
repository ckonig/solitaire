import Card from "../Deck/Card";
import Hand from "./Hand";
import { HandHoldingStack } from "./BasicStack";
import Settings from "./Settings";
import { getTableauOrder } from "../Deck/DeckSize";

class TableauStack extends HandHoldingStack {
    blinkFor = 0;
    id = 0;
    // eslint-disable-next-line no-unused-vars
    onClick = (a: any, b: any) => {};
    // eslint-disable-next-line no-unused-vars
    clickEmpty = (a: any, b: any) => {};
}
export default class Tableau {
    stacks: TableauStack[];
    settings: Settings;
    hand: Hand;

    constructor(settings: Settings, hand: Hand) {
        const ids = [0, 1, 2, 3, 4, 5, 6];
        this.hand = hand;
        this.stacks = ids.map((id) => {
            const s = new TableauStack("tableau-" + id, hand);
            s.stack = [];
            s.blinkFor = 0;
            s.id = id;
            return s;
        });
        this.settings = settings;
    }

    setOnClick = (onClick: (a: any, b: any, index: number) => void, onClickhidden: (a: any, b: any, index: number) => void, hand: Hand) => {
        this.stacks.forEach((stack, index) => {
            stack.clickEmpty = (p: any) => onClick(null, p, index);
            stack.stack.forEach((card, sindex) => {
                const click = card.isHidden && sindex == stack.stack.length-1 ? onClickhidden : onClick;
                card.onClick = (p: any) => click({ ...card }, p, index);
                card.canClick = () => !card.isHidden || this.canUncover(index, card);
            });
            hand.setOnClick(stack);
        });
    };

    getStack = (index: number) => this.stacks[index];

    wouldAcceptHand = (index: number) => this.canPutDown(this.getTop(index), this.hand, index);

    putDownHand = (index: number) => this.add(index, this.hand.putDown()); 

    canPutDown = (card: Card, hand: Hand, index: number) =>
        (card && card.isHidden && hand.isFromCurrentSource(card)) ||
        this.accepts(index, hand.currentCard()) ||
        (!card && hand.isFromTableau(index));

    accepts = (index: number, current: Card) => {
        const top = this.getTop(index);
        if (!top) {
            return current && current.face === "K";
        }
        if (top.isHidden) {
            return false;
        }
        const range = [...getTableauOrder()];
        const currentIndex = range.indexOf(current.face);
        const topIndex = range.indexOf(top.face);
        return currentIndex + 1 == topIndex && current.type.color !== top.type.color && top.face !== "A";
    };

    getCard = (index: number, card: Card) => {
        for (let j = 0; j < this.stacks[index].stack.length; j++) {
            if (card && card.equals(this.stacks[index].stack[j]) && card.isHidden === this.stacks[index].stack[j].isHidden) {
                return this.stacks[index].stack[j];
            }
        }
        return false;
    };

    popWithFollowing = (card: Card, i: number) => {
        for (let j = 0; j < this.stacks[i].stack.length; j++) {
            if (card && card.equals(this.stacks[i].stack[j])) {
                const result = this.stacks[i].stack.splice(j, this.stacks[i].stack.length);
                this.stackEntropy(i);
                return result;
            }
        }

        return [];
    };

    deal = (card: Card, index: number) => {
        this.stacks[index].stack.push(card);
    };

    canUncover = (index: number, card: Card) => {
        const top = this.getTop(index);
        return top.isHidden && card && card.equals(this.getTop(index));
    };

    uncover = (index: number, card: Card) => {
        const top = this.getTop(index);
        if (this.canUncover(index, card)) {
            top.isHidden = false;
            this.stackEntropy(index);
            return true;
        }

        return false;
    };

    stackEntropy = (index: number) => {
        let entropy = this.settings.interactionEntropy;
        let next = 1;
        let top = this.getTop(index);
        while (entropy && entropy != 0 && top) {
            top.causeEntropy(entropy);
            entropy--;
            top = this.getTop(index, next);
            next++;
        }
    };

    add = (index: number, cards: Card[]) => {
        this.stacks[index].stack = this.stacks[index].stack.concat(cards.map((c) => this.setCardProperties(c, index)));
        this.stackEntropy(index);
        return cards;
    };

    setCardProperties = (card: Card, index: number) => {
        card.source = this.stacks[index].source;
        return card;
    };

    getTop = (index: number, offset?: number) => this.stacks[index].stack[this.stacks[index].stack.length - 1 - (offset || 0)];

    static copy = (orig: Tableau, hand: Hand) => {
        const copy = new Tableau(orig.settings, hand);
        copy.stacks = orig.stacks.map((stack, index) => {
            const s = new TableauStack(stack.source, hand);
            s.id = index;
            s.stack = Card.copyAll(stack.stack);
            return s;
        });
        return copy;
    };

    setEntropy = (lvl: number) => {
        this.stacks.forEach((stack) => stack.stack.forEach((element) => element.causeEntropy(Math.min(lvl, 4))));
        return this;
    };
}
