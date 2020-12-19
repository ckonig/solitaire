import BasicStack from "./BasicStack";
import Card from "../Deck/Card";
import Focus from "./Focus";
import Hand from "./Hand";
import Settings from "./Settings";
import { getTableauOrder } from "../Deck/DeckSize";

class TableauStack extends BasicStack {
    blinkFor = 0;
    id = 0;
}
export default class Tableau {
    stacks: TableauStack[];
    settings: Settings;
    onClick: (a: any, b: any, c: any) => void;
    focus: Focus;

    constructor(settings: Settings, focus: Focus) {
        this.focus = focus;
        const ids = [0, 1, 2, 3, 4, 5, 6];
        this.stacks = ids.map((id) => {
            const s = new TableauStack("tableau-" + id);
            s.stack = [];
            s.blinkFor = 0;
            s.id = id;
            return s;
        });
        this.settings = settings;
        this.onClick = () => {};
    }

    getStack = (index: number) => this.stacks[index];

    wouldAccept = (index: number, hand: Hand) => this.canPutDown(this.getTop(index), hand, index);

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

    canUncover = (index: number, card: Card) => {
        const top = this.getTop(index);
        return top.isHidden && card && card.equals(this.getTop(index));
    };

    uncover = (index: number, card: Card) => {
        const top = this.getTop(index);
        if (this.canUncover(index, card)) {
            top.isHidden = false;
            this.focus.setCard(top);
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
        card.source = "tableau-" + index;
        return card;
    };

    getTop = (index: number, offset?: number) => this.stacks[index].stack[this.stacks[index].stack.length - 1 - (offset || 0)];

    static copy = (orig: Tableau) => {
        const copy = new Tableau(orig.settings, orig.focus);
        copy.stacks = orig.stacks.map((stack, index) => {
            const s = new TableauStack(stack.source);
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
