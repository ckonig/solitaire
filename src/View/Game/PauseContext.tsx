import React from "react";
import useGameContext from "./GameContext";

export interface IPauseState {
    //started: number;
    end: number;
    paused: boolean;
    pauses: number[];
    pauseStartedAt: number;
    allowed: number;
    isSilent?: boolean;
    pausedBy: number;
    showMenu: boolean;
    showCards: boolean;
}
export interface IPauseContext {
    state: IPauseState;
    togglePause: (isPaused: boolean, pausedBy: number) => void;
    toggleMenu: (show: boolean) => void;
    getElapsed: () => string;
}
export const defaultPauseState: IPauseState = {
    end: 0,
    paused: false,
    pauses: [],
    pauseStartedAt: 0,
    allowed: 5,
    pausedBy: -1,
    showMenu: false,
    showCards: true,
};
export const defaultPauseContext = {
    state: defaultPauseState,
    togglePause: () => {},
    toggleMenu: () => {},
    getElapsed: () => "",
};

const PauseContext = React.createContext<IPauseContext>(defaultPauseContext);

export const PauseProvider = (props: { children: any }) => {
    const { gameState } = useGameContext();
    const [paused, setPaused] = React.useState<IPauseState>({ ...defaultPauseState });
    const getElapsedMs = () => {
        const pauses = paused.pauses.reduce((a, b) => a + b, 0);
        return (paused.end || paused.pauseStartedAt || Date.now()) - gameState.started - pauses;
    };

    const getElapsed = () => {
        const padleft = (i: number) => ((i + "").length == 1 ? "0" + i : i);
        let msec = getElapsedMs();
        const hh = Math.floor(msec / 1000 / 60 / 60);
        msec -= hh * 1000 * 60 * 60;
        const mm = Math.floor(msec / 1000 / 60);
        msec -= mm * 1000 * 60;
        const ss = Math.floor(msec / 1000);
        msec -= ss * 1000;
        return hh ? hh + ":" + padleft(mm) + ":" + padleft(ss) : padleft(mm) + ":" + padleft(ss);
    };
    const togglePause = (isPaused: boolean, pausedBy: number) => {
        if (paused.showMenu) {
            setPaused({
                ...paused,
                pausedBy: pausedBy,
                pauses: [...paused.pauses, Date.now() - paused.pauseStartedAt],
                pauseStartedAt: 0,
                paused: false,
                showMenu: false,
                showCards: true,
            });
        } else if (paused.pauses.length < paused.allowed) {
            setPaused({
                ...paused,
                pausedBy: pausedBy,
                pauseStartedAt: Date.now(),
                paused: true,
                showMenu: true,
                showCards: false,
            });
        } else {
            setPaused({
                ...paused,
                pausedBy: pausedBy,
                pauseStartedAt: 0,
                paused: false,
                showMenu: true,
                showCards: false
            });
        }
    };
    const toggleMenu = (show: boolean) => {
        setPaused({
            ...paused,
            showMenu: show,
            showCards: true,
        });
    };
    const context = {
        state: { ...paused, started: gameState.started },
        togglePause,
        toggleMenu,
        getElapsed,
    };

    return <PauseContext.Provider value={context}>{props.children}</PauseContext.Provider>;
};

const usePauseContext = () => React.useContext(PauseContext);

export default usePauseContext;
