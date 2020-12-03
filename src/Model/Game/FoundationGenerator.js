import Foundation from './Foundation';
import FoundationStack from './FoundationStack';
import Suits from '../Deck/Suits';

export default function generateFoundations() {
    return new Foundation(Object.keys(Suits)
        .map(key => Suits[key])
        .map(suit => new FoundationStack(suit.icon, suit.color)));
}