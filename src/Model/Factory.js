import { CardRange, getTargetOrder } from "./Deck/CardRange";

import Deck from "./Deck/Deck";
import Foundation from "./Game/Foundation";
import Game from "./Game/Game";
import Hand from "./Game/Hand";
import Stock from "./Game/Stock";
import Suits from "./Deck/Suits";
import Tableau from "./Game/Tableau";
import Waste from "./Game/Waste";

export default class Factory {
    static getInitialState = (deck) => ({
        stock: new Stock([...deck.cards.slice(28)]),
        waste: new Waste(),
        foundation: Factory.generateFoundations(),
        tableau: Factory.generateTableau([...deck.cards.slice(0, 28)]),
        hand: new Hand(),
        game: new Game(),
    });

    static generateDeck() {
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

    static generateFoundations() {
        const template = () => ({
            stack: [],
            acceptedCards: [...getTargetOrder()],
            usedCards: [],
            icon: null,
            color: null,
        });
        return new Foundation(
            Object.keys(Suits)
                .map((key) => Suits[key])
                .map((suit) => ({ ...template(), ...suit }))
        );
    }

    static generateTableau(cards) {
        return new Tableau(new TableauGenerator().getStacks(cards));
    }
}

class TableauGenerator {
    getStacks = (deck) => {
        this.deck = deck;
        this.pointer = 0;
        this.oldpointer = this.pointer;
        const ids = [0, 1, 2, 3, 4, 5, 6];
        const template = (id) => ({
            stack: [],
            id,
        });
        this.stacks = ids.map((id) => template(id));
        ids.reverse().forEach((id) => {
            this.generateStack(id);
        });
        return this.stacks;
    };

    generateStack = (id) => {
        this.pointer += 6 - id + 1;
        this.stacks[id].stack = this.deck
            .slice(this.oldpointer, this.pointer)
            .map((c) => ({
                ...c,
                isHidden: true,
                source: "tableau-" + id,
            }))
            .reverse();
        if (this.stacks[id].stack[this.stacks[id].stack.length - 1]) {
            this.stacks[id].stack[this.stacks[id].stack.length - 1].isHidden = false;
        }
        this.oldpointer = this.pointer;
    };

    getRndInteger = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
    };
}
