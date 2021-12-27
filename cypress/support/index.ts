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
            hasWasteSuggestion: () => Chainable<Subject>;
            hasNoWasteSuggestion: () => Chainable<Subject>;
            hasStockSuggestion: () => Chainable<Subject>;
            hasNoStockSuggestion: () => Chainable<Subject>;
            hasFoundationEmptySuggestion: (stack: number) => Chainable<Subject>;
            hasTableauSuggestion: (stack: number, card: number) => Chainable<Subject>;
            hasNoTableauSuggestion: (stack: number) => Chainable<Subject>;
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
