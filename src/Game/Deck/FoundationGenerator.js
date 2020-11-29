import Suits from './Suits';
import { getTargetOrder } from './CardRange'

const getFoundation = (icon) => {
    return {
        stack: [],
        acceptedCards: [...getTargetOrder()],
        usedCards: [],
        icon,
    };
};

export default function generateFoundations() {
    return Object.keys(Suits)
        .map(key => Suits[key])
        .map(suit => getFoundation(suit.icon));
}