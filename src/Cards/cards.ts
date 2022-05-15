import CLUB1 from "./CLUB-1.svg";
import CLUB10 from "./CLUB-10.svg";
import CLUB11 from "./CLUB-11-JACK.svg";
import CLUB12 from "./CLUB-12-QUEEN.svg";
import CLUB13 from "./CLUB-13-KING.svg";
import CLUB2 from "./CLUB-2.svg";
import CLUB3 from "./CLUB-3.svg";
import CLUB4 from "./CLUB-4.svg";
import CLUB5 from "./CLUB-5.svg";
import CLUB6 from "./CLUB-6.svg";
import CLUB7 from "./CLUB-7.svg";
import CLUB8 from "./CLUB-8.svg";
import CLUB9 from "./CLUB-9.svg";
import DIAMOND1 from "./DIAMOND-1.svg";
import DIAMOND10 from "./DIAMOND-10.svg";
import DIAMOND11 from "./DIAMOND-11-JACK.svg";
import DIAMOND12 from "./DIAMOND-12-QUEEN.svg";
import DIAMOND13 from "./DIAMOND-13-KING.svg";
import DIAMOND2 from "./DIAMOND-2.svg";
import DIAMOND3 from "./DIAMOND-3.svg";
import DIAMOND4 from "./DIAMOND-4.svg";
import DIAMOND5 from "./DIAMOND-5.svg";
import DIAMOND6 from "./DIAMOND-6.svg";
import DIAMOND7 from "./DIAMOND-7.svg";
import DIAMOND8 from "./DIAMOND-8.svg";
import DIAMOND9 from "./DIAMOND-9.svg";
import HEART1 from "./HEART-1.svg";
import HEART10 from "./HEART-10.svg";
import HEART11 from "./HEART-11-JACK.svg";
import HEART12 from "./HEART-12-QUEEN.svg";
import HEART13 from "./HEART-13-KING.svg";
import HEART2 from "./HEART-2.svg";
import HEART3 from "./HEART-3.svg";
import HEART4 from "./HEART-4.svg";
import HEART5 from "./HEART-5.svg";
import HEART6 from "./HEART-6.svg";
import HEART7 from "./HEART-7.svg";
import HEART8 from "./HEART-8.svg";
import HEART9 from "./HEART-9.svg";
import SPADE1 from "./SPADE-1.svg";
import SPADE10 from "./SPADE-10.svg";
import SPADE11 from "./SPADE-11-JACK.svg";
import SPADE12 from "./SPADE-12-QUEEN.svg";
import SPADE13 from "./SPADE-13-KING.svg";
import SPADE2 from "./SPADE-2.svg";
import SPADE3 from "./SPADE-3.svg";
import SPADE4 from "./SPADE-4.svg";
import SPADE5 from "./SPADE-5.svg";
import SPADE6 from "./SPADE-6.svg";
import SPADE7 from "./SPADE-7.svg";
import SPADE8 from "./SPADE-8.svg";
import SPADE9 from "./SPADE-9.svg";

interface SuitCards {
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
    9: string;
    10: string;
    J: string;
    Q: string;
    K: string;
    A: string;
}

interface ICards {
    heart: SuitCards;
    club: SuitCards;
    diamond: SuitCards;
    spade: SuitCards;
}

const Cards = {
    heart: {
        2: HEART2,
        3: HEART3,
        4: HEART4,
        5: HEART5,
        6: HEART6,
        7: HEART7,
        8: HEART8,
        9: HEART9,
        10: HEART10,
        J: HEART11,
        Q: HEART12,
        K: HEART13,
        A: HEART1,
    },
    club: {
        2: CLUB2,
        3: CLUB3,
        4: CLUB4,
        5: CLUB5,
        6: CLUB6,
        7: CLUB7,
        8: CLUB8,
        9: CLUB9,
        10: CLUB10,
        J: CLUB11,
        Q: CLUB12,
        K: CLUB13,
        A: CLUB1,
    },
    diamond: {
        2: DIAMOND2,
        3: DIAMOND3,
        4: DIAMOND4,
        5: DIAMOND5,
        6: DIAMOND6,
        7: DIAMOND7,
        8: DIAMOND8,
        9: DIAMOND9,
        10: DIAMOND10,
        J: DIAMOND11,
        Q: DIAMOND12,
        K: DIAMOND13,
        A: DIAMOND1,
    },
    spade: {
        2: SPADE2,
        3: SPADE3,
        4: SPADE4,
        5: SPADE5,
        6: SPADE6,
        7: SPADE7,
        8: SPADE8,
        9: SPADE9,
        10: SPADE10,
        J: SPADE11,
        Q: SPADE12,
        K: SPADE13,
        A: SPADE1,
    },
} as ICards;
export default Cards;
