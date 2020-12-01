import Hand from './Game/Hand';
import Stock from './Game/Stock';
import Tableau from './Game/Tableau';
import TableauGenerator from './Game/TableauGenerator';
import Waste from './Game/Waste';
import generateFoundations from './Game/FoundationGenerator';
import { getDeck } from './Deck/Deck';

const getInitialState = () => {
    var deck = getDeck(); //@todo generate deck & stacks in constructor, allow reset
    
    return {
        stock: new Stock(deck.slice(28)),
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