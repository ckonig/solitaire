import SuggestionModes from "../../../src/Model/Game/Settings/SuggestionModes";

const assertToggleMatrix = (arr) => {
    cy.assertToggleContainer(1, 0, arr[0]);
    cy.assertToggleContainer(1, 1, arr[1]);
    cy.assertToggleContainer(2, 0, arr[2]);
    cy.assertToggleContainer(2, 1, arr[3]);
};

describe("Menu", () => {
    describe("Suggestions Screen", () => {
        beforeEach(() => {
            cy.visit("http://localhost:3000/solitaire");
            cy.contains("Options").click();
            cy.contains("Suggestions").click();
        });
        it("has default value", () => {
            assertToggleMatrix([0, 0, 1, 0]);
        });
        it("has interdependent toggles", () => {
            assertToggleMatrix([0, 0, 1, 0]);
            cy.toggleToggleContainer(1, 0);
            assertToggleMatrix([1, 0, 0, 0]);
            cy.toggleToggleContainer(2, 1);
            assertToggleMatrix([0, 0, 0, 1]);
            cy.toggleToggleContainer(1, 1);
            assertToggleMatrix([0, 1, 0, 0]);
        });
        describe("With consent", () => {
            it("it stores settings to local storage", () => {
                cy.get(".cookiebanner").click();
                cy.toggleToggleContainer(1, 0).should(() =>
                    expect(JSON.parse(localStorage.getItem("state")).suggestionMode === SuggestionModes.NONE)
                );
                cy.toggleToggleContainer(1, 1).should(() =>
                    expect(JSON.parse(localStorage.getItem("state")).suggestionMode === SuggestionModes.REGULAR)
                );
                cy.toggleToggleContainer(2, 0).should(() =>
                    expect(JSON.parse(localStorage.getItem("state")).suggestionMode === SuggestionModes.REGULAR)
                );
                cy.toggleToggleContainer(2, 1).should(() =>
                    expect(JSON.parse(localStorage.getItem("state")).suggestionMode === SuggestionModes.FULL)
                );
            });
        });
        describe("With preloaded config", () => {
            it("shows overwritten config", () => {
                cy.withConfig((c) => (c.suggestionMode = SuggestionModes.FULL)).visit("http://localhost:3000/solitaire");
                cy.contains("Options").click();
                cy.contains("Suggestions").click();
                assertToggleMatrix([0, 0, 0, 1]);
            });
        });
    });
});
