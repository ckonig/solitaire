import { StartScreenState } from "../../src/View/UI/StartScreen/StartScreenContext";

const defaultConfig = {
    ratingSettings: {
        timedMode: true,
        missPenalty: false,
        undoPenalty: true,
        hintPenalty: false,
    },
    difficultySettings: 1,
    ratingPreset: 1,
    quickDeal: true,
    autoResolve: true,
    autoUncover: false,
    speed: false,
    entropySettings: {
        baseEntropy: 2,
        interactionEntropy: 2,
    },
    suggestionMode: "NONE",
    players: {
        0: {
            id: 0,
            name: "Player 1",
            inputMethod: "gamepad",
            inputLayout: 0,
        },
        1: {
            id: 1,
            name: "Player 2",
            inputMethod: "keyboard",
            inputLayout: 0,
        },
    },
} as StartScreenState;

export default defaultConfig;
