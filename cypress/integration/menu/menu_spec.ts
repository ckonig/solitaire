import keyboard from "../../support/keyboard";

describe("Menu", () => {
    beforeEach(() => {
        cy.visitWithGamepad("http://localhost:3000/solitaire");
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
            cy.contains("Performance");
        });

        describe("keyboard navigation", () => {
            it("Up/down works as expected", () => {
                cy.highlightShouldHaveTitle("Single Player");
                keyboard().up();
                cy.highlightShouldHaveTitle("Allow Cookie");
                keyboard().down();
                cy.highlightShouldHaveTitle("Single Player");
                keyboard().down();
                cy.highlightShouldHaveTitle("Versus");
                keyboard().down();
                cy.highlightShouldHaveTitle("Options");
                keyboard().down();
                cy.highlightShouldHaveTitle("Allow Cookie");
                keyboard().down();
                cy.highlightShouldHaveTitle("Single Player");
                keyboard().down();
                cy.highlightShouldHaveTitle("Versus");
                keyboard().action();
                cy.highlightShouldHaveTitle("Versus");
                keyboard().down();
                cy.highlightShouldHaveTitle("Player 1");
                keyboard().down();
                cy.highlightShouldHaveTitle("Player 2");
                keyboard().down();
                cy.highlightShouldHaveTitle("Start");
                keyboard().down();
                cy.highlightShouldHaveTitle("Options");
                keyboard().up();
                cy.highlightShouldHaveTitle("Start");
            });
        });
        describe("gamepad navigation", () => {
            it("Up/down works as expected", () => {
                cy.highlightShouldHaveTitle("Single Player");
                cy.gamepad(0).connect();
                cy.gamepad(0).pressButton("DPadUp");
                cy.highlightShouldHaveTitle("Allow Cookie");
                cy.gamepad(0).pressButton("DPadDown");
                cy.highlightShouldHaveTitle("Single Player");
                cy.gamepad(0).pressButton("DPadDown");
                cy.highlightShouldHaveTitle("Versus");
                cy.gamepad(0).pressButton("DPadDown");
                cy.highlightShouldHaveTitle("Options");
                cy.gamepad(0).pressButton("DPadDown");
                cy.highlightShouldHaveTitle("Allow Cookie");
                cy.gamepad(0).pressButton("DPadDown");
                cy.highlightShouldHaveTitle("Single Player");
                cy.gamepad(0).pressButton("DPadDown");
                cy.highlightShouldHaveTitle("Versus");
                cy.gamepad(0).pressButton("A");
                cy.highlightShouldHaveTitle("Versus");
                cy.gamepad(0).pressButton("DPadDown");
                cy.highlightShouldHaveTitle("Player 1");
                cy.gamepad(0).pressButton("DPadDown");
                cy.highlightShouldHaveTitle("Player 2");
                cy.gamepad(0).pressButton("DPadDown");
                cy.highlightShouldHaveTitle("Start");
                cy.gamepad(0).pressButton("DPadDown");
                cy.highlightShouldHaveTitle("Options");
                cy.gamepad(0).pressButton("DPadUp");
                cy.highlightShouldHaveTitle("Start");
            });
        });
    });
});
