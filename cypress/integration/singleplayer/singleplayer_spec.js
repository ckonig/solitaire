/* eslint-disable no-undef */
describe("SinglePlayer", () => {
    describe("New Game", () => {
        before(() => {
            cy.visit("http://localhost:3000/solitaire");
            cy.contains("Single Player").click();
        });
        it("Every tableau stack has 1 uncovered card", () => {
            cy.get(".mainface").should("have.length", 7);
        });

        it("Stock has X cards", () => {
            cy.get(".board-field.stock").within(() => cy.get(".card").should("have.length", 24));
        });

        it("Waste is empty", () => {
            cy.get(".board-field.waste").within(() => cy.get(".card").should("have.length", 0));
        });

        it("Tableaus are dealt", () => {
            cy.get(".tableau-0").within(() => cy.get(".card").should("have.length", 7));
            cy.get(".tableau-1").within(() => cy.get(".card").should("have.length", 6));
            cy.get(".tableau-2").within(() => cy.get(".card").should("have.length", 5));
            cy.get(".tableau-3").within(() => cy.get(".card").should("have.length", 4));
            cy.get(".tableau-4").within(() => cy.get(".card").should("have.length", 3));
            cy.get(".tableau-5").within(() => cy.get(".card").should("have.length", 2));
            cy.get(".tableau-6").within(() => cy.get(".card").should("have.length", 1));
        });
    });
});
