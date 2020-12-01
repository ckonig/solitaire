import Hand from './Game/Hand';
import Stock from './Game/Stock';
import Waste from './Game/Waste';
import generateFoundations from './Game/FoundationGenerator';
import generateTableau from './Game/TableauGenerator';

const getInitialState = (deck) => {
    return {
        stock: new Stock(deck.cards.slice(24)),
        waste: new Waste(),
        foundation: generateFoundations(),
        tableau: generateTableau(deck.cards.slice(0,28)),

        hand: new Hand(),

        //todo move to status or game/party/action substate
        currentMove: null,
        moves: [],
        points: 0,
        started: Date.now(),
    };
}

export default getInitialState