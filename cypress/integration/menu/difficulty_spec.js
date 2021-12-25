/* eslint-disable no-undef */
describe("Menu", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/solitaire");
        cy.contains("Options").click();
    });

    describe("Options", () => {
        describe("Difficulty Screen", () => {
            beforeEach(() => {
                cy.contains("Difficulty").click();
            });
            it("has basic elements", () => {
                cy.contains("No limit");
                cy.contains("Three passes");
                cy.contains("Only a single pass");
                cy.contains("Turn 1 card");
                cy.contains("Turn 3 cards");
            });
            it("shows cookie banner", () => {
                cy.contains("Changes on this page will be lost");
            });
            it("has default preset", () => {
                cy.contains("Turn 1 card after the other from the Stock to the Waste.");
                cy.contains("Three passes through the deck. Waste can be recycled to Stock two times.");
            });
        });
    });
});
