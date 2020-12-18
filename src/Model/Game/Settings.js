export default class Settings {
    constructor(launchSettings) {
        this.launchSettings = launchSettings;
        const isTouch = this.is_touch_device();
        this.mouseModes = ["follow-cursor", "remain-on-stack"];
        this.mouseMode = isTouch ? "remain-on-stack" : "follow-cursor";

        this.entropyLevels = ["none", "low", "regular", "high", "extreme"];
        this.baseEntropy = isTouch ? 1 : 2;
        this.interactionEntropy = isTouch ? 1 : 2;

        this.suggestionModes = ["none", "scored", "regular", "full"];
        this.suggestionMode = "none";
        
        this.hintModes = ["twice", "once"];
        this.hintMode = "once";
    }

    is_touch_device() {
        try {
            const prefixes = " -webkit- -moz- -o- -ms- ".split(" ");

            const mq = (query) => window.matchMedia(query).matches;

            if ("ontouchstart" in window || (typeof window.DocumentTouch !== "undefined" && document instanceof window.DocumentTouch)) {
                return true;
            }

            return mq(["(", prefixes.join("touch-enabled),("), "heartz", ")"].join(""));
        } catch (e) {
            console.error("(Touch detect failed)", e);
            return false;
        }
    }

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
