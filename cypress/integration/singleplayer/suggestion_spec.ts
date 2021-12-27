import SuggestionModes from "../../../src/Model/Game/Settings/SuggestionModes";

interface SuggestionExpectations {
    stock?: boolean;
    waste?: boolean;
    tableau: { [id: number]: number | number[] | boolean };
    foundation: { [id: number]: boolean };
}

const defaultExpectation = () =>
    ({
        tableau: { 0: false, 1: false, 2: false, 3: false, 4: false, 5: false, 6: false },
        foundation: { 0: false, 1: false, 2: false, 3: false },
    } as SuggestionExpectations);

const expectSuggestions = (mod: (suggest: SuggestionExpectations) => void) => {
    const expectation = defaultExpectation();
    mod(expectation);

    if (expectation.waste) {
        cy.hasWasteSuggestion();
    } else {
        cy.hasNoWasteSuggestion();
    }

    if (expectation.stock) {
        cy.hasStockSuggestion();
    } else {
        cy.hasNoStockSuggestion();
    }

    Object.keys(expectation.foundation).forEach((key) => {
        if (expectation.foundation[key]) {
            //@todo also check top card if not empty
            cy.hasFoundationEmptySuggestion(parseInt(key));
        }
    });

    Object.keys(expectation.tableau).forEach((key) => {
        if (expectation.tableau[key] === true) {
            //@todo check if any
        } else if (expectation.tableau[key] === false) {
            //@todo check if none
        }
        if (Array.isArray(expectation.tableau[key])) {
            expectation.tableau[key].forEach((element) => {
                cy.hasTableauSuggestion(parseInt(key), element);
            });
            //@todo validate there are no other suggestions in stack
        }
        if (typeof expectation.tableau[key] == "number") {
            cy.hasTableauSuggestion(parseInt(key), expectation.tableau[key]);
            //@todo check there is no other suggestion
        }
    });
};

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

                //@todo move assertions to callbacks. Use same flow for all suggestion mode tests.

                expectSuggestions((suggest) => {
                    suggest.tableau = { ...suggest.tableau, 1: 5, 2: 4, 4: 2 };
                });

                cy.clickOnTableau(4);

                expectSuggestions((suggest) => {
                    suggest.tableau = { ...suggest.tableau, 5: 1 };
                });

                cy.clickOnTableau(5);

                expectSuggestions((suggest) => {
                    suggest.tableau = { ...suggest.tableau, 4: 1 };
                });

                cy.clickOnTableau(4);

                expectSuggestions((suggest) => {
                    suggest.tableau = { ...suggest.tableau, 1: 5, 2: 4, 4: 1, 5: 1 };
                });

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

                expectSuggestions((suggest) => {
                    suggest.stock = true;
                });

                cy.dealFromStock();

                expectSuggestions((suggest) => {
                    suggest.waste = true;
                });

                [...Array(7)].forEach(() => cy.dealFromStock());

                cy.clickOnWaste();

                expectSuggestions((suggest) => {
                    suggest.foundation = { ...suggest.foundation, 1: true };
                });
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
