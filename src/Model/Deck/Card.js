export default class Card {
    constructor(face, type, isHidden) {
        this.face = face;
        this.type = type;
        this.isHidden = isHidden;
        this.entropyStyle = {};
        this.causeEntropy(3);
    }

    causeEntropy = (lvl) => {
        const level = lvl * 2;
        //@todo this is awesome but move it to model
        const random = () => Math.random() < 0.5;
        const randomInt = (min, max) => Math.random() * (max - min) + min;
            //shift
            if (random()) {
                this.entropyStyle["left"] = randomInt(0, level / 2);
            } else {
                this.entropyStyle["right"] = randomInt(0, level / 2);
            }
           //rotate
            console.log("rotating");
            this.entropyStyle["transform"] = "rotate(" + randomInt(level * -1, level) + "deg)";
            console.log(this.entropyStyle);
        
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
        return copy;
    };

    static copyAll = (cards) => cards.map((card) => Card.copy(card));
}
