export default class CardTools {
    static cardEquals(card, otherCard) {
        return (!card && !otherCard) || (card && otherCard && otherCard.face == card.face && otherCard.type.icon == card.type.icon);
    }

    static cardNotEquals(card, otherCard) {
        return otherCard.face !== card.face || otherCard.type.icon !== card.type.icon;
    }

    static filterOut(stacks, card) {
        for (let i = 0; i < stacks.length; i++) {
            stacks[i].stack = CardTools.filterNotEqual(stacks[i].stack, card);
        }

        return stacks;
    }

    static filterNotEqual(stack, card) {
        return stack.filter((value) => {
            return CardTools.cardNotEquals(value, card);
        });
    }
}
