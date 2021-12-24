import React from "react";

const BoardContext = React.createContext({
    player: 0,
});

export const useBoardContext = () => React.useContext(BoardContext);

export const BoardProvider = BoardContext.Provider;
