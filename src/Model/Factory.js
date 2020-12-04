import { CardRange } from "./Deck/CardRange";
import Deck from "./Deck/Deck";
import Foundation from "./Game/Foundation";
import FoundationStack from "./Game/FoundationStack";
import Game from "./Game/Game";
import Hand from "./Game/Hand";
import Stock from "./Game/Stock";
import Suits from "./Deck/Suits";
import Tableau from "./Game/Tableau";
import Waste from "./Game/Waste";

export default class Factory {
    getInitialState = (deck) => ({
        stock: new Stock([...deck.cards.slice(28)]),
        waste: new Waste(),
        foundation: this.generateFoundations(),
        tableau: this.generateTableau([...deck.cards.slice(0, 28)]),
        hand: new Hand(),
        game: new Game(),
    });

    generateDeck() {
        const deck = [];
        const keys = Object.keys(Suits);
        for (let i = 0; i < CardRange.length; i++) {
            for (let j = 0; j < keys.length; j++) {
                const suit = Suits[keys[j]];
                deck.push({
                    face: CardRange[i],
                    type: suit,
                    isHidden: true,
                });
            }
        }
        return new Deck(deck);
    }

    generateFoundations() {
        return new Foundation(
            Object.keys(Suits)
                .map((key) => Suits[key])
                .map((suit) => new FoundationStack(suit.icon, suit.color))
        );
    }

    generateTableau(cards) {
        return new Tableau(new TableauGenerator().getStacks(cards));
    }
}

class TableauGenerator {
    getStacks = (deck) => {
        this.deck = deck;
        this.pointer = 0;
        this.oldpointer = this.pointer;
        const ids = [0, 1, 2, 3, 4, 5, 6];
        this.stacks = ids.map((id) => this.getStack(id));
        ids.reverse().forEach((id) => {
            this.generateStack(id);
        });
        return this.stacks;
    };

    generateStack = (id) => {
        this.pointer += 6 - id + 1;
        this.stacks[id].stack = this.deck
            .slice(this.oldpointer, this.pointer)
            .map((c) => {
                c.isHidden = true;
                c.source = "tableau-" + id;
                return c;
            })
            .reverse();
        if (this.stacks[id].stack[this.stacks[id].stack.length - 1]) {
            this.stacks[id].stack[this.stacks[id].stack.length - 1].isHidden = false;
        }
        this.oldpointer = this.pointer;
    };

    getRndInteger = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
    };

    getStack = (id) => {
        const template = { stack: [], id };
        //@todo add functionality
        return { ...template };
    };
}
