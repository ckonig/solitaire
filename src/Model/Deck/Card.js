export default class Card {
    constructor(face, type, isHidden) {
        this.face = face;
        this.type = type;
        this.isHidden = isHidden;
    }

    equals = (other) => {
        return Card.equals(this, other);
    };

    static equals(card, otherCard) {
        return (!card && !otherCard) || (card && otherCard && otherCard.face == card.face && otherCard.type.icon == card.type.icon);
    }
}
