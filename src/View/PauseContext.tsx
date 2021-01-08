import React from "react";

export interface IPauseState {
    started: number;
    end: number;
    paused: boolean;
    pauses: number[];
    pauseStartedAt: number;
    allowed: number;
    isSilent?: boolean;
    pausedBy: number;
    showMenu: boolean;
}
export interface IPauseContext {
    state: IPauseState;
    togglePause: (isPaused: boolean, pausedBy: number) => void;
    getElapsed: () => string,
}
export const defaultPauseState = {
    started: 0,
    end: 0,
    paused: false,
    pauses: [],
    pauseStartedAt: 0,
    allowed: 5,
    pausedBy: -1,
    showMenu: false,
};
export const defaultPauseContext = {
    state: defaultPauseState,
    togglePause: () => {},
    getElapsed: () => "",
};

const PauseContext = React.createContext<IPauseContext>(defaultPauseContext);
const PauseContextProvider = PauseContext.Provider;

export const PauseProvider = (props: any) => {
    const [paused, setPaused] = React.useState<IPauseState>({ ...defaultPauseState });
    const getElapsedMs = () => {
        const pauses = paused.pauses.reduce((a, b) => a + b, 0);
        return (paused.end || paused.pauseStartedAt || Date.now()) - props.started - pauses;
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
            });
        } else if (paused.pauses.length < paused.allowed) {
            setPaused({
                ...paused,
                pausedBy: pausedBy,
                pauseStartedAt: Date.now(),
                paused: true,
                showMenu: true,
            });
        } else {
            setPaused({
                ...paused,
                pausedBy: pausedBy,
                pauseStartedAt: 0,
                paused: false,
                showMenu: true,
            });
        }
    };
    const context = {
        state: { ...paused, started: props.started },
        togglePause,
        getElapsed,
    };

    return <PauseContextProvider value={context}>{props.children}</PauseContextProvider>;
};

export default PauseContext;
