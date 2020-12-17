import BusinessModel from "./Business/BusinessModel";
import Card from "./Model/Deck/Card";

export type StateReplacer = (state: BusinessModel) => BusinessModel | null;
export type StateUpdater = (state: BusinessModel) => void;
export type StateReplaceFunction = (modifier: StateReplacer, callback?: any) => void;
export type StateUpdateFunction = (modifier: StateUpdater) => void;

export interface AppState {
    initialized: boolean;
    drawMode: string;
    recyclingMode: string;
}

export interface ClickHandler {
    dispatchPutDown: (card: Card, position: any, state: BusinessModel, index: number) => void;
    dispatchPickup: (card: Card, position: any, state: BusinessModel, index: number) => void;
}

export type BlinkFunction = (state: BusinessModel, index: number) => void;
