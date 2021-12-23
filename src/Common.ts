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

export interface LaunchSettings extends RatingSettings {
    recyclingMode: string;
    drawMode: string;
    interactionEntropy: number;
    baseEntropy: number;
    suggestionMode: string;
    players: PlayerSettings;
    boardMode: string;
    initialized?: boolean;
    quickDeal?: boolean;
    speed?: boolean;
    autoUncover?: boolean;
}

export interface ClickHandler {
    dispatchPutDown: (card: Card, position: any, state: Model, index: number) => void;
    dispatchPickup: (card: Card | null, position: any, state: Model, index: number) => void;
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
