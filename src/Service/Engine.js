import Foundation from './Foundation';
import Hand from '../Model/Game/Hand';
import Stock from './Stock';
import Tableau from '../Model/Game/Tableau';
import TableauGenerator from '../Model/Game/TableauGenerator';
import TableauStack from './TableauStack';
import Waste from './Waste';
import generateFoundations from '../Model/Game/FoundationGenerator';
import { getDeck } from '../Model/Deck/Deck';

export default class Engine {
    constructor(stateholder) {
        this.tableauStack = new TableauStack(stateholder);
        this.foundation = new Foundation(stateholder);
        this.stock = new Stock(stateholder);
        this.waste = new Waste(stateholder);
    }

    getInitialState = () => {
        var deck = getDeck(); //@todo generate deck & stacks in constructor, allow reset
        var stockPile = deck.slice(28); //@todo make obj, add functionality

        return {
            stockPile: stockPile,
            waste: [],
            currentMove: null,
            moves: [],
            points: 0,
            started: Date.now(),
            foundations: generateFoundations(),
            tableau: new Tableau(new TableauGenerator().getStacks([...deck.slice(0, 28)])),
            hand: new Hand(),
        };

    }
}