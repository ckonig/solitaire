import { FakeGamepad } from "./IGamePad";
import { StartScreenState } from "../../src/View/UI/StartScreen/StartScreenContext";

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        interface Chainable<Subject> {
            // Main Menu

            // Screens
            assertToggleContainer: (row: number, index: number, value: boolean) => void;
            toggleToggleContainer: (row: number, index: number) => Chainable<Subject>;

            //Keyboard

            // Gamepad
            gamepad: (i: number) => FakeGamepad;

            // Board
            assertStockSize: (size: number, wait?: number) => Chainable<Subject>;
            assertWasteSize: (size: number) => Chainable<Subject>;
            assertTableauSize: (index: number, size: number) => Chainable<Subject>;
            assertFoundationSize: (index: number, size: number) => Chainable<Subject>;
            assertUncoveredCardsCount: (count: number) => Chainable<Subject>;
            dealFromStock: () => Chainable<Subject>;

            // Boot
            withConfig: (mod: (config: StartScreenState) => void) => Chainable<Subject>;
            visitWithGamepad: (url) => Chainable<Subject>;
        }
    }
}

export {};
