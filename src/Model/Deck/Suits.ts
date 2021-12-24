import { mdiCardsClub } from '@mdi/js';
import { mdiCardsDiamond } from '@mdi/js';
import { mdiCardsHeart } from '@mdi/js';
import { mdiCardsSpade } from '@mdi/js';

export interface Suit {
    icon: string;
    color: string;
}

const Suits: { [id: string]: Suit } = {
    heart: {
        icon: mdiCardsHeart,
        color: "red",
    },
    club: {
        icon: mdiCardsClub,
        color: "black",
    },
    diamond: {
        icon: mdiCardsDiamond,
        color: "red",
    },
    spade: {
        icon: mdiCardsSpade,
        color: "black",
    },
};

export default Suits;
