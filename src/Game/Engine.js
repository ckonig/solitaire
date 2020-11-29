import Base from './Base';
import Foundation from './Foundation';
import Stock from './Stock';
import TableauGenerator from './Deck/TableauGenerator';
import TableauStack from './TableauStack';
import generateFoundations from './Deck/FoundationGenerator';
import { getDeck } from './Deck/Deck';

export default class Engine extends Base {
    constructor(stateholder) {
        super(stateholder)
        this.tableauStack = new TableauStack(stateholder);
        this.foundation = new Foundation(stateholder);
        this.stock = new Stock(stateholder);
    }

    getInitialState = () => {
        var deck = getDeck();
        var stockPile = deck.slice(0, 18);
        var tableau = deck.slice(22);
        var stacks = new TableauGenerator().getStacks([...tableau]);

        return {
            currentCard: null, // @todo remove currentCard
            stockPile: stockPile,
            waste: [],
            foundations: generateFoundations(),
            stacks: stacks,
            hand: {
                stack: [],
                source: null
            },
            onTableauStackClick: this.tableauStack.click,
            onFoundationClick: this.foundation.click,
            clickStockPile: this.stock.clickStockPile,
            clickOnWaste: this.stock.clickWaste,
        };

    }
}