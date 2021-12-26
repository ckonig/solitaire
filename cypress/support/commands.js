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
