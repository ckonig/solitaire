/* eslint-disable no-undef */
const moveOneCard = (beforeOnStock, beforeOnWaste) => {
    cy.get(".board-field.stock").within(() => cy.get(".card").should("have.length", beforeOnStock));
    cy.get(".board-field.waste").within(() => cy.get(".card").should("have.length", beforeOnWaste));
    cy.get(".board-field.stock").within(() => cy.get(".card").last().click());
    cy.get(".board-field.stock").within(() => cy.get(".card").should("have.length", beforeOnStock - 1));
    cy.get(".board-field.waste").within(() => cy.get(".card").should("have.length", beforeOnWaste + 1));
};

const moveWholeStock = () => {
    for (let i = 24, j = 0; i > 0; i--, j++) {
        moveOneCard(i, j);
    }
};

const recycle = () => cy.get(".board-field.stock").within(() => cy.get(".socket-empty").click());

describe("SinglePlayer", () => {
    describe("New Game", () => {
        beforeEach(() => {
            cy.visit("http://localhost:3000/solitaire");
        });

        it("Stock can move 1 card to waste", () => {
            cy.contains("Single Player").click();
            moveOneCard(24, 0);
        });
        
        describe("single draw, three passes", () => {
            it("Stock can move all cards to waste and recycle 2 times", () => {
                cy.contains("Single Player").click();
                moveWholeStock();
                recycle();
                moveWholeStock();
                recycle();
                moveWholeStock();
                recycle();
                cy.get(".board-field.stock").within(() => cy.get(".card").should("have.length", 0));
                cy.get(".board-field.waste").within(() => cy.get(".card").should("have.length", 24));
                recycle();
                cy.get(".board-field.stock").within(() => cy.get(".card").should("have.length", 0));
                cy.get(".board-field.waste").within(() => cy.get(".card").should("have.length", 24));
            });
        });
    });
});
