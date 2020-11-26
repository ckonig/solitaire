import React from 'react';

const clickCard = () => {

}

export const GameState = {
    currentCard: null,
    color: 'black',
    clickCard,
};

export const GameContext = React.createContext(GameState);

export const { Provider, Consumer } = GameContext;