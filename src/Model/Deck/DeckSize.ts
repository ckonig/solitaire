export const DeckSize = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

export const getFoundationOrder = () => {
    return ["A", ...DeckSize.slice(0, DeckSize.length - 1)].reverse();
};

export const getTableauOrder = () => {
    return [...DeckSize];
};
