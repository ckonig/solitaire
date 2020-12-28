export interface GameMode {
    key: string;
    title: string;
    boardMode: string;
    autoConfig: boolean;
}

export default class GameModes {
    static QUICK: GameMode = {
        key: "QUICK",
        title: "Quick Game",
        boardMode: "singleplayer",
        autoConfig: true,
    };
    static CUSTOM: GameMode = {
        key: "CUSTOM",
        title: "Custom Game",
        boardMode: "singleplayer",
        autoConfig: false,
    };
    static VERSUS: GameMode = {
        key: "VERSUS",
        title: "Versus",
        boardMode: "splitscreen",
        autoConfig: false,
    };
    static NULL: GameMode = {
        key: "",
        title: "",
        boardMode: "",
        autoConfig: false,
    };
}
