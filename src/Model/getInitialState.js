import Hand from './Game/Hand';
import Stock from './Game/Stock';
import Waste from './Game/Waste';
import generateDeck from './Deck/DeckGenerator';
import generateFoundations from './Game/FoundationGenerator';
import generateTableau from './Game/TableauGenerator';

const getInitialState = () => {
    var deck = generateDeck();
    //deck.shuffle();
    return {

        waste: new Waste(),
        foundation: generateFoundations(),
        tableau: generateTableau([...deck.take(28)]),
        stock: new Stock(deck.take(24)),

        hand: new Hand(),

        currentMove: null,
        moves: [],
        points: 0,
        started: Date.now(),
    };
}

export default getInitialState