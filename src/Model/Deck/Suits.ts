import { mdiCardsClub, mdiCardsDiamond, mdiCardsHeart, mdiCardsSpade } from "@mdi/js";

export interface Suit {
    icon: string;
    color: string;
    name: string;
}

const Suits: { [id: string]: Suit } = {
    heart: {
        icon: mdiCardsHeart,
        color: "red",
        name: "heart",
    },
    club: {
        icon: mdiCardsClub,
        color: "black",
        name: "club",
    },
    diamond: {
        icon: mdiCardsDiamond,
        color: "red",
        name: "diamond",
    },
    spade: {
        icon: mdiCardsSpade,
        color: "black",
        name: "spade",
    },
};

export default Suits;
