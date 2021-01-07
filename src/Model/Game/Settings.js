import SuggestionModes from "./Settings/SuggestionModes";

export default class Settings {
    constructor(launchSettings) {
        this.launchSettings = launchSettings;

        this.baseEntropy = launchSettings.baseEntropy;
        this.interactionEntropy = launchSettings.interactionEntropy;

        this.suggestionModes = SuggestionModes.allSuggestionModes();
        this.suggestionMode = SuggestionModes.get(launchSettings.suggestionMode);
    }

    setSuggestionMode = (sm) => {
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

    static copy = (orig) => {
        const copy = new Settings(orig.launchSettings);
        copy.suggestionMode = orig.suggestionMode;
        copy.baseEntropy = orig.baseEntropy;
        copy.interactionEntropy = orig.interactionEntropy;
        copy.hintMode = orig.hintMode;
        return copy;
    };
}
