class CardTool {

    cardEquals(card, otherCard) {
        return (!card && !otherCard) || card && otherCard && otherCard.face == card.face && otherCard.type.icon == card.type.icon;
    }

    cardNotEquals(card, otherCard) {
        return otherCard.face !== card.face || otherCard.type.icon !== card.type.icon;
    }

    filterNotEqual(stack, card) {
        return stack.filter((value, index, arr) => {
            return CardTools.cardNotEquals(value, card.props);
        });
    }

    filterOut(stacks, card) {
        for (var i = 0; i < stacks.length; i++) {
            stacks[i].stack = CardTools.filterNotEqual(stacks[i].stack, card);
        }

        return stacks;
    }
}
const CardTools = new CardTool();
export default CardTools 