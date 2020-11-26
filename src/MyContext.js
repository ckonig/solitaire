import React from 'react';

export const defaultValue = {
    currentCard: 'hallo',
    setCurrentCard: (card) => {},
};
export const MyContext = React.createContext(defaultValue);