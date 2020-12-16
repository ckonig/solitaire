export default class LaunchSettings {
    constructor() {
        this.recyclingModes = ["infinite", "3-pass", "1-pass"];
        this.recyclingMode = "3-pass";
        this.drawModes = ["single", "triple"];
        this.drawMode = "single";
    }

    static copy = (orig) => {
        const copy = new LaunchSettings();
        copy.drawMode = orig.drawMode;
        copy.recyclingMode = orig.recyclingMode;
        return copy;
    };
}
