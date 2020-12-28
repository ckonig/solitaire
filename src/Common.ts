import BusinessModel from "./Business/BusinessModel";
import Card from "./Model/Deck/Card";
import { GameMode } from "./GameModes";

export type StateReplacer = (state: BusinessModel) => BusinessModel | null;
export type StateUpdater = (state: BusinessModel) => void;
export type StateReplaceFunction = (modifier: StateReplacer) => void;
export type StateUpdateFunction = (modifier: StateUpdater) => void;

export interface AppState extends RatingSettings {
    inputMode: string;
    initialized?: boolean;
    drawMode?: string;
    recyclingMode?: string;
    boardMode: string;
}

export interface ClickHandler {
    dispatchPutDown: (card: Card, position: any, state: BusinessModel, index: number) => void;
    dispatchPickup: (card: Card, position: any, state: BusinessModel, index: number) => void;
}

export type BlinkFunction = (state: BusinessModel, index: number) => void;

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
