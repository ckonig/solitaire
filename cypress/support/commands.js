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
Cypress.Commands.add("assertStockSize", (i, wait = Cypress.config().defaultCommandTimeout) =>
    cy.get(".board-field.stock").within(() => cy.get(".card", { timeout: wait }).should("have.length", i))
);
Cypress.Commands.add("assertWasteSize", (i) => cy.get(".board-field.waste").within(() => cy.get(".card").should("have.length", i)));
Cypress.Commands.add("assertTableauSize", (t, i) => cy.get(`.tableau-${t}`).within(() => cy.get(".card").should("have.length", i)));
Cypress.Commands.add("assertFoundationSize", (t, i) => cy.get(`.foundation-${t}`).within(() => cy.get(".card").should("have.length", i)));
Cypress.Commands.add("dealFromStock", () => cy.get(".board-field.stock").within(() => cy.get(".card").last().click()));
Cypress.Commands.add("recycle", () => cy.get(".board-field.stock").within(() => cy.get(".socket-empty").click()));
Cypress.Commands.add("hasWasteSuggestion", () =>
    cy.get(`.board-field.waste`).within(() => cy.get(".card").last().should("have.class", "card-suggested"))
);
Cypress.Commands.add("hasStockSuggestion", () =>
    cy.get(`.board-field.stock`).within(() => cy.get(".card").last().should("have.class", "card-suggested"))
);
Cypress.Commands.add("hasNoStockSuggestion", () =>
    cy.get(`.board-field.stock`).within(() =>
        cy
            .get(".card")
            .last()
            .should((c) => c.not(".card-suggested"))
    )
);
Cypress.Commands.add("hasFoundationEmptySuggestion", (stack) =>
    cy.get(`.foundation-${stack}`).within(() => cy.get(".card-base").first().should("have.class", "socket-suggested"))
);
Cypress.Commands.add("hasTableauSuggestion", (stack, card) =>
    cy.get(`.tableau-${stack}`).within(() => cy.get(".card").eq(card).should("have.class", "card-suggested"))
);
Cypress.Commands.add("hasNoTableauSuggestion", (stack, card) =>
    cy.get(`.tableau-${stack}`).within(() =>
        cy
            .get(".card")
            .eq(card)
            .should(($c) => $c.not(".class-suggested"))
    )
);
Cypress.Commands.add("clickOnWaste", () => cy.get(".board-field.waste").within(() => cy.get(".card").last().click()));
Cypress.Commands.add("clickOnTableau", (stack) => cy.get(`.tableau-${stack}`).within(() => cy.get(".card").last().click()));
Cypress.Commands.add("clickOnTableauCard", (stack, card) =>
    cy.get(`.tableau-${stack}`).within(() => cy.get(".card").eq(card).get(".align-left").first().click())
);

// Boot
Cypress.Commands.add("withConfig", (mod) => {
    const config = defaultConfig;
    mod(config);
    localStorage.setItem("consent", JSON.stringify(1));
    localStorage.setItem("state", JSON.stringify(config));
});
Cypress.Commands.add("visitWithGamepad", (url) => cy.visit(url, gamepad(0).inject()));
