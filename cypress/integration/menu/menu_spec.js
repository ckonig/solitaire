/* eslint-disable no-undef */
describe("Menu", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/solitaire");
    });

    describe("Structure", () => {
        it("Has all main menu entries", () => {
            cy.contains("Single Player");
            cy.contains("Versus");
            cy.contains("Options");
            cy.contains("Allow Cookie");
        });
        it("Options has subitems", () => {
            cy.contains("Difficulty");
            cy.contains("Penalties");
            cy.contains("Suggestions");
            cy.contains("Support");
            cy.contains("Entropy");
        });
    });
});
