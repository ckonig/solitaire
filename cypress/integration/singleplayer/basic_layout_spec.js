/* eslint-disable no-undef */
describe("SinglePlayer", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/solitaire");
        cy.contains("Single Player").click();
    });

    describe("New Game", () => {
        it("Board has all fields", () => {
            cy.get(".board-field.stock").should("have.length", 1);
            cy.get(".board-field.waste").should("have.length", 1);
            cy.get(".board-field.foundation").should("have.length", 4);
            cy.get(".board-field.tableau").should("have.length", 7);
        });
    });
});
