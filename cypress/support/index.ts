import { FakeGamepad } from "./IGamePad";
import { StartScreenState } from "../../src/View/UI/StartScreen/StartScreenContext";

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        interface Chainable<Subject> {
            visitWithGamepad: (url) => Chainable<Subject>;
            gamepad: (i: number) => FakeGamepad;
            assertToggleContainer: (row: number, index: number, value: boolean) => void;
            assertStoreConfig: (mod: (config: StartScreenState) => void) => void;
            toggleToggleContainer: (row: number, index: number) => Chainable<Subject>;
            withConfig: (mod: (config: StartScreenState) => void) => Chainable<Subject>;
        }
    }
}

export {};
