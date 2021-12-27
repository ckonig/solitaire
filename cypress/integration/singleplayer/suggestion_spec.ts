import SuggestionModes from "../../../src/Model/Game/Settings/SuggestionModes";

//@todo test suggestions with prepared deck
describe("Single Player", () => {
    describe("Suggestions", () => {
        describe("full", () => {
            //@todo
        });
        describe("regular", () => {
            it("does stuff", () => {
                cy.withConfig((config) => {
                    config.featureSwitches.shuffle = false;
                    config.suggestionMode = SuggestionModes.REGULAR;
                    config.quickDeal = true;
                    config.featureSwitches.confetti = false;
                    config.featureSwitches.undo = false;
                    config.difficultySettings = 3;
                }).visit("http://localhost:3000/solitaire");
                cy.contains("Single Player").click();

                cy.hasNoStockSuggestion();
                cy.hasNoTableauSuggestion(0, 6);
                cy.hasTableauSuggestion(1, 5);
                cy.hasTableauSuggestion(2, 4);
                cy.hasNoTableauSuggestion(3, 3);
                cy.hasTableauSuggestion(4, 2);
                cy.hasNoTableauSuggestion(5, 1);
                cy.hasNoTableauSuggestion(6, 0);

                cy.clickOnTableau(4);

                cy.hasNoStockSuggestion();
                cy.hasNoTableauSuggestion(0, 6);
                cy.hasNoTableauSuggestion(1, 5);
                cy.hasNoTableauSuggestion(2, 4);
                cy.hasNoTableauSuggestion(3, 3);
                cy.hasNoTableauSuggestion(4, 1);
                cy.hasTableauSuggestion(5, 1);
                cy.hasNoTableauSuggestion(6, 0);

                cy.clickOnTableau(5);

                cy.hasNoStockSuggestion();
                cy.hasNoTableauSuggestion(0, 6);
                cy.hasNoTableauSuggestion(1, 5);
                cy.hasNoTableauSuggestion(2, 4);
                cy.hasNoTableauSuggestion(3, 3);
                cy.hasTableauSuggestion(4, 1);
                cy.hasNoTableauSuggestion(5, 1);
                cy.hasNoTableauSuggestion(6, 0);

                cy.clickOnTableau(4);

                cy.hasNoStockSuggestion();
                cy.hasNoTableauSuggestion(0, 6);
                cy.hasTableauSuggestion(1, 5);
                cy.hasTableauSuggestion(2, 4);
                cy.hasNoTableauSuggestion(3, 3);
                cy.hasTableauSuggestion(4, 1);
                cy.hasTableauSuggestion(5, 1);
                cy.hasNoTableauSuggestion(6, 0);

                cy.clickOnTableau(4);
                cy.clickOnTableau(5);
                cy.clickOnTableau(4);
                cy.clickOnTableauCard(5, 1);
                cy.clickOnTableau(4);
                cy.clickOnTableau(5);
                cy.clickOnTableauCard(4, 1);
                cy.clickOnTableau(6);
                cy.clickOnTableau(4);
                cy.clickOnTableau(2);
                cy.clickOnTableau(3);
                cy.clickOnTableau(2);
                cy.clickOnTableau(2);
                cy.clickOnTableau(6);
                cy.clickOnTableau(2);
                cy.clickOnTableau(0);
                cy.clickOnTableau(6);
                cy.clickOnTableau(0);

                cy.hasStockSuggestion();

                cy.dealFromStock();

                cy.hasNoStockSuggestion();
                cy.hasWasteSuggestion();

                [...Array(7)].forEach(() => cy.dealFromStock());

                cy.clickOnWaste();

                cy.hasFoundationEmptySuggestion(1)
            });
        });
        describe("scored", () => {
            //@todo
        });
        describe("none", () => {
            //@todo
        });
    });
});
