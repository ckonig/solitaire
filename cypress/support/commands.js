/* eslint-disable no-undef */
import { gamepad } from "./gamepad";

// Main Menu

Cypress.Commands.add("getHighlight", () => cy.get(".highlight"));

Cypress.Commands.add("shouldHaveTitle", { prevSubject: "element" }, (subject, options) => {
    return cy.wrap(subject).invoke("attr", "title").should("eq", options);
});

// Keyboard

Cypress.Commands.add("navDown", () => cy.get("body").type("{downarrow}"));

Cypress.Commands.add("navUp", () => cy.get("body").type("{uparrow}"));

Cypress.Commands.add("navAction", () => cy.get("body").type("{q}"));

// Gamepad Commands

Cypress.Commands.add("gamepad", (i) => gamepad(i));
Cypress.Commands.add("connect", { prevSubject: "gamepad" }, (s) => s.connect());
Cypress.Commands.add("disconnect", { prevSubject: "gamepad" }, (s) => s.disconnect());
Cypress.Commands.add("pressButton", { prevSubject: "gamepad" }, (s, b) => s.pressButton(b));

// Inject Fake Gamepad
Cypress.Commands.add("startWithGamepad", () =>
    cy.visit("http://localhost:3000/solitaire", {
        // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
        onBeforeLoad(win) {
            win.navigator.getGamepads = () => gamepad().getGamepads();
        },
    })
);

// Board
Cypress.Commands.add("assertUncoveredCardsCount", (i) => cy.get(".mainface").should("have.length", i));
Cypress.Commands.add("assertStockSize", (i) => cy.get(".board-field.stock").within(() => cy.get(".card").should("have.length", i)));
Cypress.Commands.add("assertWasteSize", (i) => cy.get(".board-field.waste").within(() => cy.get(".card").should("have.length", i)));
Cypress.Commands.add("assertTableauSize", (t, i) => cy.get(`.tableau-${t}`).within(() => cy.get(".card").should("have.length", i)));
Cypress.Commands.add("assertFoundationSize", (t, i) => cy.get(`.foundation-${t}`).within(() => cy.get(".card").should("have.length", i)));
Cypress.Commands.add("dealFromStock", () => cy.get(".board-field.stock").within(() => cy.get(".card").last().click()));
Cypress.Commands.add("recycle", () => cy.get(".board-field.stock").within(() => cy.get(".socket-empty").click()));
