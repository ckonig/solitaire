import Foundation from './Foundation';
import Hand from '../Model/Hand';
import Stock from './Stock';
import Tableau from '../Model/Tableau';
import TableauGenerator from '../Deck/TableauGenerator';
import TableauStack from './TableauStack';
import Waste from './Waste';
import generateFoundations from '../Deck/FoundationGenerator';
import { getDeck } from '../Deck/Deck';

export default class Engine {
    constructor(stateholder) {
        this.tableauStack = new TableauStack(stateholder);
        this.foundation = new Foundation(stateholder);
        this.stock = new Stock(stateholder);
        this.waste = new Waste(stateholder);
    }

    //@todo move to separate builder 
    getInitialState = () => {
        var deck = getDeck(); //@todo generate deck & stacks in constructor, allow reset
        var stockPile = deck.slice(28); //@todo make obj, add functionality
        var tableau = deck.slice(0, 28); //@todo make obj, add functionality
        var stacks = new TableauGenerator().getStacks([...tableau]);

        return {
            stockPile: stockPile,
            waste: [],
            currentMove: null,
            moves: [],
            points: 0,
            started: Date.now(),
            foundations: generateFoundations(),
            tableau: new Tableau(stacks),
            hand: new Hand(),
        };

    }
}