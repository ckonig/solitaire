export default class Card {
    constructor(face, type, isHidden) {
        this.face = face;
        this.type = type;
        this.isHidden = isHidden;
        this.entropyStyle = {};
        this.source = "";
        this.suggestion = false;
    }

    causeEntropy = (lvl) => {
        const level = lvl * 2;
        const random = () => Math.random() < 0.5;
        const randomInt = (min, max) => Math.random() * (max - min) + min;
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

    equals = (other) => {
        return Card.equals(this, other);
    };

    static equals(card, otherCard) {
        return (!card && !otherCard) || (card && otherCard && otherCard.face == card.face && otherCard.type.icon == card.type.icon);
    }

    static copy = (orig) => {
        const copy = new Card(orig.face, orig.type, orig.isHidden);
        copy.source = orig.source;
        copy.entropyStyle = { ...orig.entropyStyle };
        copy.canClick = orig.canClick;
        return copy;
    };

    static copyAll = (cards) => cards.map((card) => Card.copy(card));
}
