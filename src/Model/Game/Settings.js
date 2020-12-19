import SuggestionModes from "./Settings/SuggestionModes";

export default class Settings {
    constructor(launchSettings) {
        this.launchSettings = launchSettings;
        const isTouch = launchSettings.isTouch;
        this.mouseModes = ["follow-cursor", "remain-on-stack"];
        this.mouseMode = isTouch ? "remain-on-stack" : "follow-cursor";

        this.entropyLevels = ["none", "low", "regular", "high", "extreme"];
        this.baseEntropy = isTouch ? 1 : 2;
        this.interactionEntropy = isTouch ? 1 : 2;

        this.suggestionModes = SuggestionModes.allSuggestionModes();
        this.suggestionMode = SuggestionModes.default();
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
        copy.mouseMode = orig.mouseMode;
        copy.baseEntropy = orig.baseEntropy;
        copy.interactionEntropy = orig.interactionEntropy;
        copy.hintMode = orig.hintMode;
        return copy;
    };
}
