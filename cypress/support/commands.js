/* eslint-disable no-undef */
import defaultConfig from "./defaultConfig";
import { gamepad } from "./gamepad";

// Main Menu
Cypress.Commands.add("getHighlight", () => cy.get(".highlight"));
Cypress.Commands.add("shouldHaveTitle", { prevSubject: "element" }, (subject, options) => {
    return cy.wrap(subject).invoke("attr", "title").should("eq", options);
});

//Screens
Cypress.Commands.add("assertToggleContainer", (row, index, value) =>
    cy
        .get(".row")
        .eq(row)
        .within(() =>
            cy
                .get(".togglecontainer")
                .eq(index)
                .within(() => (value ? cy.get(".react-toggle--checked") : cy.get(".react-toggle--checked").should("not.exist")))
        )
);
Cypress.Commands.add("toggleToggleContainer", (row, index) =>
    cy
        .get(".row")
        .eq(row)
        .within(() =>
            cy
                .get(".togglecontainer")
                .eq(index)
                .within(() => cy.get(".react-toggle").first().click())
        )
);

// Keyboard
Cypress.Commands.add("navDown", () => cy.get("body").type("{downarrow}"));
Cypress.Commands.add("navUp", () => cy.get("body").type("{uparrow}"));
Cypress.Commands.add("navAction", () => cy.get("body").type("{q}"));

// Gamepad
Cypress.Commands.add("gamepad", (i) => gamepad(i));
Cypress.Commands.add("connect", { prevSubject: "gamepad" }, (s) => s.connect());
Cypress.Commands.add("disconnect", { prevSubject: "gamepad" }, (s) => s.disconnect());
Cypress.Commands.add("pressButton", { prevSubject: "gamepad" }, (s, b) => s.pressButton(b));

// Board
Cypress.Commands.add("assertUncoveredCardsCount", (i) => cy.get(".mainface").should("have.length", i));
Cypress.Commands.add("assertStockSize", (i) => cy.get(".board-field.stock").within(() => cy.get(".card").should("have.length", i)));
Cypress.Commands.add("assertWasteSize", (i) => cy.get(".board-field.waste").within(() => cy.get(".card").should("have.length", i)));
Cypress.Commands.add("assertTableauSize", (t, i) => cy.get(`.tableau-${t}`).within(() => cy.get(".card").should("have.length", i)));
Cypress.Commands.add("assertFoundationSize", (t, i) => cy.get(`.foundation-${t}`).within(() => cy.get(".card").should("have.length", i)));
Cypress.Commands.add("dealFromStock", () => cy.get(".board-field.stock").within(() => cy.get(".card").last().click()));
Cypress.Commands.add("recycle", () => cy.get(".board-field.stock").within(() => cy.get(".socket-empty").click()));

// Boot
Cypress.Commands.add("withConfig", (mod) => {
    const config = defaultConfig;
    mod(config);
    localStorage.setItem("consent", JSON.stringify(1));
    localStorage.setItem("state", JSON.stringify(config));
});
Cypress.Commands.add("visitWithGamepad", (url) => cy.visit(url, gamepad(0).inject()));
