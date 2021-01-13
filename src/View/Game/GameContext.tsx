import React from "react";

export interface IGameState {
    started: number;
    isEnded: boolean;
    end: number;
    winner: number;
    loser: number;
}

export interface IGameContext {
    gameState: IGameState;
    win: (player: number) => void;
    giveUp: (player: number) => void;
    start: () => void;
}

export const defaultGameState = {
    started: 0,
    isEnded: false,
    end: 0,
    winner: -1,
    loser: -1,
};

const GameContext = React.createContext<IGameContext>({
    gameState: defaultGameState,
    win: () => {},
    start: () => {},
    giveUp: () => {},
});

const useGameContext = () => React.useContext(GameContext);

export default useGameContext;

export const GameContextProvider = (props: { children: any }) => {
    const [gameState, setGameState] = React.useState<IGameState>(defaultGameState);
    const context = {
        gameState,
        win: (player: number) => setGameState({ ...gameState, end: Date.now(), isEnded: true, winner: player }),
        start: () => setGameState({ ...gameState, started: Date.now() }),
        giveUp: (player: number) => setGameState({ ...gameState, end: Date.now(), isEnded: true, loser: player }),
    };
    return <GameContext.Provider value={context}>{props.children}</GameContext.Provider>;
};
