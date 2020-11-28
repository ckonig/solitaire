export const filterOut = (stacks, card) => {
    for (var i = 0; i < stacks.length; i++) {
        var filtered = stacks[i].stack.filter((value, index, arr) => {
            return value.face !== card.props.face || value.type.icon !== card.props.type.icon;
        });
        stacks[i].stack = filtered;
    }

    return stacks;
}