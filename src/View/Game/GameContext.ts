import React from "react";

export interface IGameState {
    started: number;
    isEnded: boolean;
    end: number;
    winner: number;
}

export interface IGameContext {
    gameState: IGameState;
    win: (player: number) => void;
    start: () => void;
}

export const defaultGameState = {
    started: 0,
    isEnded: false,
    end: 0,
    winner: -1,
};

const GameContext = React.createContext<IGameContext>({
    gameState: defaultGameState,
    win: () => {},
    start: () => {},
});

export default GameContext;
