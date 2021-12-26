import { FakeGamepad } from "./gamepad";
import { StartScreenState } from "../../src/View/UI/StartScreen/StartScreenContext";

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        interface Chainable<Subject> {
            startWithGamepad: () => void;
            gamepad: (i: number) => FakeGamepad;
            assertToggleContainer: (row: number, index: number, value: boolean) => void;
            assertStoreConfig: (mod: (config: StartScreenState) => void) => void;
            toggleToggleContainer: (row: number, index: number) => Chainable<Subject>;
        }
    }
}

export {};
