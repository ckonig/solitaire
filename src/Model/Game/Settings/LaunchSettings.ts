import { PlayerSettings } from "../../../Common";
import SuggestionModes from "./SuggestionModes";

export default class LaunchSettings {
    recyclingMode: string;
    drawMode: string;
    inputMode: string;
    interactionEntropy: number;
    baseEntropy: number;
    suggestionMode: string;
    players: PlayerSettings;
    boardMode: string;
    constructor() {
        this.recyclingMode = "3-pass";
        this.drawMode = "single";
        this.inputMode = "mouse";
        this.interactionEntropy = 1;
        this.baseEntropy = 1;
        this.suggestionMode = SuggestionModes.NONE;
        this.players = {};
        this.boardMode = "";
    }
}
