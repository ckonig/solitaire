/* eslint-disable no-undef */
describe("Menu", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/solitaire");
        cy.contains("Versus").click();
    });

    describe("Versus", () => {
        it("has subitems", () => {
            cy.contains("Player 1");
            cy.contains("Player 2");
            cy.contains("Start");
        });
    });
});
