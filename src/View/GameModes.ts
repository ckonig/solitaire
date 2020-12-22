export default class GameModes {
    static QUICK = "SINGLEPLAYER";
    static CUSTOM = "CUSTOM";
    static VERSUS = "VERSUS";
    static getTitle(mode: string) {
        switch (mode) {
            case GameModes.QUICK:
                return "Quick Game";
            case GameModes.CUSTOM:
                return "Custom Game";
            case GameModes.VERSUS:
                return "Versus";
            default:
                return "";
        }
    }
    static getBoardMode(mode: string) {
        switch (mode) {
            case GameModes.VERSUS:
                return "splitscreen";
            default:
                return "singleplayer";
        }
    }
}
