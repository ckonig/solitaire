import { Suit } from "./Suits";

export default class Card {
    face: string;
    type: Suit;
    isHidden: boolean;
    entropyStyle: any;
    source: string;
    suggestion: boolean;
    success: number;
    canClick: () => boolean;
    onClick: (_p: any) => (s: any) => void;
    constructor(face: string, type: Suit, isHidden: boolean) {
        this.face = face;
        this.type = type;
        this.isHidden = isHidden;
        this.entropyStyle = {};
        this.source = "";
        this.suggestion = false;
        this.success = 0;
        this.canClick = () => false;
        // eslint-disable-next-line no-unused-vars
        this.onClick = (_p) => (s: any) => {};
    }

    setSuccess = (s : number) => {
        this.success = s;
    }

    causeEntropy = (lvl: number) => {
        if (lvl == 0) {
            this.entropyStyle = {};
            return;
        }
        const level = lvl * 2;
        const random = () => Math.random() < 0.5;
        const randomInt = (min: number, max: number) => Math.random() * (max - min) + min;
        //shift
        if (random()) {
            if (random()) {
                this.entropyStyle["left"] = randomInt(0, level / 20) + "vw";
            } else {
                this.entropyStyle["right"] = randomInt(0, level / 20) + "vw";
            }
        }
        //rotate
        this.entropyStyle["transform"] = "rotate(" + randomInt(level * -1, level) + "deg)";
    };

    equals = (other: Card | null) => {
        return other && Card.equals(this, other) || false;
    };

    static equals(card: Card, otherCard: Card) {
        return (!card && !otherCard) || (card && otherCard && otherCard.face == card.face && otherCard.type.icon == card.type.icon);
    }

    static copy = (orig: Card) => {
        const copy = new Card(orig.face, orig.type, orig.isHidden);
        copy.source = orig.source;
        copy.entropyStyle = { ...orig.entropyStyle };
        copy.canClick = orig.canClick;
        copy.onClick = orig.onClick;
        return copy;
    };

    static copyAll = (cards: Card[]) => cards.map((card) => Card.copy(card));
}
