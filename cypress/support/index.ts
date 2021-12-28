import { TestGamepad, TestGamepads } from "./gamepad";

import { StartScreenState } from "../../src/View/UI/StartScreen/StartScreenContext";

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        interface Chainable<Subject> {
            // Main Menu
            highlightShouldHaveTitle: (v: string) => Chainable<Subject>;

            // Screens
            assertToggleContainer: (row: number, index: number, value: boolean) => void;
            toggleToggleContainer: (row: number, index: number) => Chainable<Subject>;

            // Gamepad
            gamepad: (i: number) => TestGamepad;
            gamepads: (i: number) => TestGamepads;

            // Board
            assertStockSize: (size: number, wait?: number) => Chainable<Subject>;
            assertWasteSize: (size: number) => Chainable<Subject>;
            assertTableauSize: (index: number, size: number) => Chainable<Subject>;
            assertFoundationSize: (index: number, size: number) => Chainable<Subject>;
            assertUncoveredCardsCount: (count: number) => Chainable<Subject>;
            dealFromStock: () => Chainable<Subject>;
            hasWasteSuggestion: () => Chainable<Subject>;
            hasNoWasteSuggestion: () => Chainable<Subject>;
            hasStockSuggestion: () => Chainable<Subject>;
            hasNoStockSuggestion: () => Chainable<Subject>;
            hasFoundationEmptySuggestion: (stack: number) => Chainable<Subject>;
            hasNoFoundationEmptySuggestion: (stack: number) => Chainable<Subject>;
            hasFoundationSuggestion: (stack: number) => Chainable<Subject>;
            hasNoFoundationSuggestion: (stack: number) => Chainable<Subject>;
            hasTableauSuggestion: (stack: number) => Chainable<Subject>;
            hasTableauEmptySuggestion: (stack: number) => Chainable<Subject>;
            hasTableauCardSuggestion: (stack: number, card: number) => Chainable<Subject>;
            hasNoTableauSuggestion: (stack: number) => Chainable<Subject>;
            hasNoTableauEmptySuggestion: (stack: number) => Chainable<Subject>;
            hasNoTableauCardSuggestion: (stack: number, card: number) => Chainable<Subject>;
            clickOnWaste: () => Chainable<Subject>;
            clickOnTableau: (stack: number) => Chainable<Subject>;
            clickOnEmptyTableau: (stack: number) => Chainable<Subject>;
            clickOnTableauCard: (stack: number, card: number) => Chainable<Subject>;
            clickOnFoundation: (stack: number) => Chainable<Subject>;
            clickOnEmptyFoundation: (stack: number) => Chainable<Subject>;

            // Boot
            withConfig: (mod: (config: StartScreenState) => void) => Chainable<Subject>;
            visitWithGamepad: (url) => Chainable<Subject>;
        }
    }
}

export {};
