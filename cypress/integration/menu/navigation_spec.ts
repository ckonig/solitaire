import keyboard from "../../support/keyboard";

describe("Menu", () => {
    beforeEach(() => {
        cy.visitWithGamepad("http://localhost:3000/solitaire");
        cy.highlightShouldHaveTitle("Single Player");
    });

    describe("Navigation", () => {
        const flow = (nav: () => any) => {
            nav().up();
            cy.highlightShouldHaveTitle("Allow Cookie");
            nav().down();
            cy.highlightShouldHaveTitle("Single Player");
            nav().down();
            cy.highlightShouldHaveTitle("Versus");
            nav().down();
            cy.highlightShouldHaveTitle("Options");
            nav().action();
            cy.contains("Difficulty");
            cy.contains("Penalties");
            cy.contains("Suggestions");
            cy.contains("Support");
            cy.contains("Entropy");
            cy.contains("Performance");
            nav().down();
            nav().action();
            cy.contains("Turn 1 card");
            nav().cancel();
            nav().up();
            nav().action();
            nav().down();
            cy.highlightShouldHaveTitle("Allow Cookie");
            nav().down();
            cy.highlightShouldHaveTitle("Single Player");
            nav().down();
            cy.highlightShouldHaveTitle("Versus");
            nav().action();
            cy.highlightShouldHaveTitle("Versus");
            nav().down();
            cy.highlightShouldHaveTitle("Player 1");
            nav().down();
            cy.highlightShouldHaveTitle("Player 2");
            nav().down();
            cy.highlightShouldHaveTitle("Start");
            nav().down();
            cy.highlightShouldHaveTitle("Options");
            nav().up();
            cy.highlightShouldHaveTitle("Start");
        };

        describe("works with keyboard", () => {
            it("Up/down works as expected", () => {
                flow(() => keyboard());
            });
        });
        
        describe("works with gamepad", () => {
            it("Up/down works as expected", () => {
                cy.gamepad(0).connect();
                flow(() => cy.gamepad(0));
            });
        });
    });
});
