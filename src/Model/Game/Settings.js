export default class Settings {
    constructor() {
        this.mouseModes = ["follow-cursor", "remain-on-stack"];
        this.mouseMode = this.getMouseMode();
        this.entropyLevels = ["none", "low", "regular", "high", "extreme"];
        this.entropyLevel = this.getEntropyLevel();
        this.drawModes = ["single"];
        this.drawMode = "single"; //@todo implement triple draw
    }

    getMouseMode = () => {}; //@todo detect  touch or web

    getEntropyLevel = () => 2; //@todo detect  touch or web (touch needs lower default entropy)
}
