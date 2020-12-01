import Hand from './Game/Hand';
import Tableau from './Game/Tableau';
import TableauGenerator from './Game/TableauGenerator';
import Waste from './Game/Waste';
import generateFoundations from './Game/FoundationGenerator';
import { getDeck } from './Deck/Deck';

const getInitialState = () => {
    var deck = getDeck(); //@todo generate deck & stacks in constructor, allow reset
    var stockPile = deck.slice(28); //@todo make obj, add functionality

    return {
        stockPile: stockPile,
        waste: new Waste(),
        currentMove: null,
        moves: [],
        points: 0,
        started: Date.now(),
        foundations: generateFoundations(),
        tableau: new Tableau(new TableauGenerator().getStacks([...deck.slice(0, 28)])),
        hand: new Hand(),
    };
}

export default getInitialState