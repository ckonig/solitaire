export interface Suit {
    icon: string;
    color: string;
}

const Suits: { [id: string]: Suit } = {
    heart: {
        icon: "♥",
        color: "red",
    },
    club: {
        icon: "♣",
        color: "black",
    },
    diamond: {
        icon: "♦",
        color: "red",
    },
    spade: {
        icon: "♠",
        color: "black",
    },
};

export default Suits;
