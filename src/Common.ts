import Card from "./Model/Deck/Card";
import Model from "./Model/Model";

export type StateReplacer = (state: Model) => Model | null;
export type StateUpdater = (state: Model) => void;
export type StateReplaceFunction = (modifier: StateReplacer) => void;
export type StateUpdateFunction = (modifier: StateUpdater) => void;

export const defaultPlayerSettings: PlayerSettings = {
    0: {
        id: 0,
        name: "Player 1",
        inputMethod: "gamepad",
        inputLayout: 0,
    },
    1: {
        id: 1,
        name: "Player 2",
        inputMethod: "keyboard",
        inputLayout: 0,
    },
};

interface PlayerSetting {
    id: number;
    name: string;
    inputMethod: string;
    inputLayout: number;
}

export interface PlayerSettings {
    [id: number]: PlayerSetting;
}

export interface AppState extends RatingSettings {
    inputMode: string;
    initialized?: boolean;
    drawMode: string;
    recyclingMode: string;
    boardMode: string;
    players: PlayerSettings;
}

export interface ClickHandler {
    dispatchPutDown: (card: Card, position: any, state: Model, index: number) => void;
    dispatchPickup: (card: Card, position: any, state: Model, index: number) => void;
}

export type BlinkFunction = (state: Model, index: number) => void;

export interface RatingSettings {
    undoPenalty?: boolean;
    hintPenalty?: boolean;
    timedMode?: boolean;
    missPenalty?: boolean;
}

export interface EntropySettings {
    baseEntropy?: number;
    interactionEntropy?: number;
}
