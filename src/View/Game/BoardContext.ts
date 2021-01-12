import React from "react";

export const BoardContext = React.createContext({
    player: 0,
});

export const BoardProvider = BoardContext.Provider;
