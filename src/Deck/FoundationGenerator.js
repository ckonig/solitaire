import Suits from './Suits';
import { getTargetOrder } from './CardRange'

const getFoundation = (icon) => {
    return {
        stack: [],
        acceptedCards: [...getTargetOrder()],
        usedCards: [],
        icon,
        //@todo add functionality
    };
};

export default function generateFoundations() {
    return Object.keys(Suits)
        .map(key => Suits[key])
        .map(suit => getFoundation(suit.icon));
}