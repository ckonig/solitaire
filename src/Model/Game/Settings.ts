import SuggestionModes, { SuggestionMode } from "./Settings/SuggestionModes";

import { LaunchSettings } from "../../Common";

export default class Settings {
    launchSettings: LaunchSettings;
    baseEntropy: number;
    interactionEntropy: number;
    suggestionModes: SuggestionMode[];
    suggestionMode: SuggestionMode;

    constructor(launchSettings: LaunchSettings) {
        this.launchSettings = launchSettings;
        this.baseEntropy = launchSettings.baseEntropy;
        this.interactionEntropy = launchSettings.interactionEntropy;
        this.suggestionModes = SuggestionModes.allSuggestionModes();
        this.suggestionMode = SuggestionModes.get(launchSettings.suggestionMode);
    }

    setSuggestionMode = (sm: string) => {
        if (this.suggestionMode.key !== sm) {
            this.suggestionMode = SuggestionModes.get(sm);
        }
    };

    enableHint = () => {
        this.suggestionMode = SuggestionModes.getHintMode();
    };

    disableHint = () => {
        if (this.suggestionMode.isTemporary && this.suggestionMode.next) {
            this.suggestionMode = SuggestionModes.get(this.suggestionMode.next);
            return true;
        }
        return false;
    };

    static copy = (orig: Settings) => {
        const copy = new Settings(orig.launchSettings);
        copy.suggestionMode = orig.suggestionMode;
        copy.baseEntropy = orig.baseEntropy;
        copy.interactionEntropy = orig.interactionEntropy;
        return copy;
    };
}
