import React from "react";

export interface IPauseState {
    started: number;
    end: number;
    paused: boolean;
    pauses: number[];
    pauseStartedAt: number;
    allowed: number;
    isSilent?: boolean;
}
export interface IPauseContext {
    state: IPauseState;
    togglePause: (isPaused: boolean, silend: boolean) => void;
}
export const defaultPauseState = { started: 0, end: 0, paused: false, pauses: [], pauseStartedAt: 0, allowed: 5 };
export const defaultPauseContext = {
    state: defaultPauseState,
    togglePause: () => {},
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
    const togglePause = (isPaused: boolean, isSilent?: boolean) => {
        if (paused.paused == isPaused) {
            if (paused.paused) {
                setPaused({
                    ...paused,
                    pauses: [...paused.pauses, Date.now() - paused.pauseStartedAt],
                    pauseStartedAt: 0,
                    paused: false,
                    isSilent: isSilent,
                });
            } else if (paused.pauses.length < paused.allowed) {
                setPaused({
                    ...paused,
                    pauseStartedAt: Date.now(),
                    paused: true,
                    isSilent: isSilent,
                });
            }
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
