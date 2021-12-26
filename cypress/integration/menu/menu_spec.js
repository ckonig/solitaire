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
            cy.contains("Options").click();
            cy.contains("Difficulty");
            cy.contains("Penalties");
            cy.contains("Suggestions");
            cy.contains("Support");
            cy.contains("Entropy");
        });
        describe("keyboard navigation", () => {
            it.only("Up/down works as expected", () => {
                cy.get(".highlight").invoke("attr", "title").should("eq", "Single Player");
                cy.get("body").type("{downarrow}");
                cy.get(".highlight").invoke("attr", "title").should("eq", "Versus");
                cy.get("body").type("{downarrow}");
                cy.get(".highlight").invoke("attr", "title").should("eq", "Options");
                cy.get("body").type("{downarrow}");
                cy.get(".highlight").invoke("attr", "title").should("eq", "Allow Cookie");
                cy.get("body").type("{downarrow}");
                cy.get(".highlight").invoke("attr", "title").should("eq", "Single Player");
                cy.get("body").type("{downarrow}");
                cy.get("body").type("{q}");
                cy.get("body").type("{downarrow}");
                cy.get(".highlight").invoke("attr", "title").should("eq", "Player 1");
                cy.get("body").type("{downarrow}");
                cy.get("body").type("{downarrow}");
                cy.get("body").type("{downarrow}");
                cy.get(".highlight").invoke("attr", "title").should("eq", "Options");
                cy.get("body").type("{uparrow}");
                cy.get(".highlight").invoke("attr", "title").should("eq", "Start");
            });
        });
    });
});
