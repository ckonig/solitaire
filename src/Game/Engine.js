import Base from './Base';
import Foundation from './Foundation';
import Stock from './Stock';
import TableauGenerator from '../Deck/TableauGenerator';
import TableauStack from './TableauStack';
import { getDeck } from '../Deck/Deck';
import { getTargetOrder } from '../Deck/CardRange'

export default class Engine extends Base {
    constructor(stateholder) {
        super(stateholder)
        this.tableauStack = new TableauStack(stateholder);
        this.foundation = new Foundation(stateholder);
        this.stock = new Stock(stateholder);
        this.tableauGenerator = new TableauGenerator();
    }

    getInitialState = () => {
        var deck = getDeck();

        var stockPile = deck.slice(0, 20);
        var tableau = deck.slice(20);
        var stacks = this.tableauGenerator.getStacks([...tableau]);

        var getFoundation = (icon) => {
            return {
                stack: [],
                acceptedCards: [...getTargetOrder()],
                usedCards: [],
                icon,
            };
        };
        return {
            currentCard: null,
            stockPile: stockPile,
            waste: [],
            foundations: [getFoundation("♥"), getFoundation("♦"), getFoundation("♣"), getFoundation("♠")],
            stacks: stacks,
            hand: {
                stack: [],
                source: null
            },
            onTableauStackClick: this.tableauStack.click,
            onFoundationClick: this.foundation.click,
            clickStockPile: this.stock.clickStockPile,
            pickup: this.pickup,
            clickOnWaste: this.stock.clickWaste,
        };

    }
}