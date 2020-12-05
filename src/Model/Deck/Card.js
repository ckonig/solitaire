export default class Card {
    static equals(card, otherCard) {
        return (!card && !otherCard) || (card && otherCard && otherCard.face == card.face && otherCard.type.icon == card.type.icon);
    }

    static notEquals(card, otherCard) {
        return otherCard.face !== card.face || otherCard.type.icon !== card.type.icon;
    }

    static filterOut(stacks, card) {
        for (let i = 0; i < stacks.length; i++) {
            stacks[i].stack = Card.filterNotEqual(stacks[i].stack, card);
        }

        return stacks;
    }

    static filterNotEqual(stack, card) {
        return stack.filter((value) => {
            return Card.notEquals(value, card);
        });
    }
}
