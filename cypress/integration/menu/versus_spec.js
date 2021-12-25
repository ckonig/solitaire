/* eslint-disable no-undef */

const checkCookieBanner = () =>
    it("shows cookie banner", () => {
        cy.contains("Changes on this page will be lost");
    });

const checkControlSetup = () =>
    it("has control setup", () => {
        cy.contains("Mouse or");
        cy.contains("Touchpad");
        cy.contains("Gamepad 1");
        cy.contains("Gamepad 2");
        cy.contains("Keyboard");
    });

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
        it("can hide subitems", () => {
            cy.contains("Versus").click();
            cy.contains("Player 1").should("not.exist");
            cy.contains("Player 2").should("not.exist");
            cy.contains("Start").should("not.exist");
        });
        describe("Player 1", () => {
            beforeEach(() => {
                cy.contains("Player 1").click();
            });
            checkControlSetup();
            checkCookieBanner();
        });
        describe("Player 2", () => {
            beforeEach(() => {
                cy.contains("Player 2").click();
            });
            checkControlSetup();
            checkCookieBanner();
        });
    });
});
