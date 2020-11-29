import Base from './Base';
import Foundation from './Foundation';
import Stock from './Stock';
import TableauGenerator from '../Deck/TableauGenerator';
import TableauStack from './TableauStack';
import Waste from './Waste';
import { getDeck } from '../Deck/Deck';
import { getTargetOrder } from '../Deck/CardRange'

export default class Engine extends Base {
    constructor(stateholder) {
        super(stateholder)
        this.tableauStack = new TableauStack(stateholder);
        this.foundation = new Foundation(stateholder);
        this.stock = new Stock(stateholder);
        this.waste = new Waste(stateholder);
        this.tableauGenerator = new TableauGenerator();
    }

    getInitialState = () => {
        var deck = getDeck();

        var stock = deck.slice(0, 20);
        var tableau = deck.slice(20);
        var stacks = this.tableauGenerator.getStacks([...tableau]);

        var getFoundation = (icon) => {
            return {
                stack: [],
                acceptedCards: [...getTargetOrder()],
                icon,
            };
        };
        return {
            currentCard: null,
            stock: stock,
            waste: [],
            foundations: [getFoundation("♥"), getFoundation("♦"), getFoundation("♣"), getFoundation("♠")],
            //deck: tableau,
            stacks: stacks,
            hand: {
                stack: [],
                source: null
            },
            onTableauStackClick: this.tableauStack.click,
            onFoundationClick: this.foundation.click,
            clickStock: this.stock.click,
            pickup: this.pickup,
            clickOnWaste: this.waste.click,
            recycle: this.stock.recycle,
        };

    }
}