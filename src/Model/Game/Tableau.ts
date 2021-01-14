import Card from "../Deck/Card";
import Hand from "./Hand";
import MultiStack from "./MultiStack";
import Settings from "./Settings";
import TableauStack from "./TableauStack";

export default class Tableau extends MultiStack<TableauStack> {
    constructor(settings: Settings, hand: Hand) {
        super(
            settings,
            hand,
            [0, 1, 2, 3, 4, 5, 6].map((id) => {
                const s = new TableauStack("tableau-" + id, hand);
                s.id = id;
                return s;
            })
        );
    }

    setOnClick = (
        onClick: (a: any, b: any, index: number) => (s: any) => void,
        onClickhidden: (a: any, b: any, index: number) => (s: any) => void
    ) => {
        this.stacks.forEach((stack, index) => {
            stack.setOnClick(
                (a: any, b: any) => onClick(a, b, index),
                (a: any, b: any) => onClickhidden(a, b, index)
            );
        });
    };

    getStack = (index: number) => this.stacks[index];

    wouldAcceptHand = (index: number) => this.canPutDown(this.getTop(index), this.hand, index);

    //@todo when putting back hand, no entropy is observed

    putDownHand = (index: number) => this.add(index, this.hand.source, this.hand.putDown());

    canPutDown = (card: Card, hand: Hand, index: number) =>
        (card && card.isHidden && hand.isFromCurrentSource(card)) ||
        this.accepts(index, hand.currentCard()) ||
        (!card && hand.isFromTableau(index));

    accepts = (index: number, current?: Card | null) => {
        if (!current) return false;
        return this.stacks[index].accepts(current);
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
        return this.stacks[index].canUncover(card);
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

    //@todo entropy as animated effect, triggered after rendering gamestate like blink
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

    add = (index: number, source: string, cards: Card[]) => {
        this.stacks[index].stack = this.stacks[index].stack.concat(cards.map((c) => this.setCardProperties(c, index)));
        this.stackEntropy(index);
        return cards;
    };

    setCardProperties = (card: Card, index: number) => {
        card.source = this.stacks[index].source;
        return card;
    };

    getTop = (index: number, offset?: number) => this.stacks[index].getTop(offset);

    static copy = (orig: Tableau, hand: Hand) => {
        const copy = new Tableau(orig.settings, hand);
        copy.stacks = orig.stacks.map(TableauStack.copy);
        return copy;
    };

    setEntropy = (lvl: number) => {
        this.stacks.forEach((stack) => stack.stack.forEach((element) => element.causeEntropy(Math.min(lvl, 4))));
        return this;
    };
}
