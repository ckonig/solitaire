/* eslint-disable no-undef */
describe("Menu", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/solitaire");
        cy.contains("Options").click();
    });

    describe("Options", () => {
        it("Options has subitems", () => {
            cy.contains("Difficulty");
            cy.contains("Penalties");
            cy.contains("Suggestions");
            cy.contains("Support");
            cy.contains("Entropy");
        });
        describe("Difficulty Screen", () => {
            it("has basic elements", () => {
                cy.contains("Difficulty").click();
                cy.contains("No limit");
                cy.contains("Three passes");
                cy.contains("Only a single pass");
                cy.contains("Turn 1 card");
                cy.contains("Turn 3 cards");
            });
        });
    });
});
