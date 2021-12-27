/* eslint-disable no-undef */

// generic single stack s+w
//@todo support empty suggestions
const assertStackSize = (type, i, wait = Cypress.config().defaultCommandTimeout) =>
    cy.get(`.board-field.${type}`).within(() => cy.get(".card", { timeout: wait }).should("have.length", i));
const hasStackSuggestion = (type) =>
    cy.get(`.board-field.${type}`).within(() => cy.get(".card").last().should("have.class", "card-suggested"));
const hasNoStackSuggestion = (type) => {
    cy.get(`.board-field.${type}`).within(() => cy.get(".card").should((s) => s.not("exist") || s.not(".card-suggested")));
    cy.get(`.board-field.${type}`).within(() => cy.get(".socket-suggested").should((s) => s.not("exist")));
};
const clickOnStack = (type) => cy.get(`.board-field.${type}`).within(() => cy.get(".card").last().click());
const clickOnEmptyStack = (type) => cy.get(`.board-field.${type}`).within(() => cy.get(".socket-empty").click());

// whole board
Cypress.Commands.add("assertUncoveredCardsCount", (i) => cy.get(".mainface").should("have.length", i));

// stock
Cypress.Commands.add("assertStockSize", (i, wait = Cypress.config().defaultCommandTimeout) => assertStackSize("stock", i, wait));
Cypress.Commands.add("dealFromStock", () => clickOnStack("stock")); //@todo rename to clickOnStock
Cypress.Commands.add("recycle", () => clickOnEmptyStack("stock")); //@todo rename to clickOnEmptyStock
Cypress.Commands.add("hasStockSuggestion", () => hasStackSuggestion("stock"));
Cypress.Commands.add("hasNoStockSuggestion", () => hasNoStackSuggestion("stock"));

// waste
Cypress.Commands.add("assertWasteSize", (i, wait = Cypress.config().defaultCommandTimeout) => assertStackSize("waste", i, wait));
Cypress.Commands.add("clickOnWaste", () => clickOnStack("waste"));
Cypress.Commands.add("clickOnEmptyWaste", () => clickOnEmptyStack("waste"));
Cypress.Commands.add("hasWasteSuggestion", () => hasStackSuggestion("waste"));
Cypress.Commands.add("hasNoWasteSuggestion", () => hasNoStackSuggestion("waste"));

//@todo extract generic multistack t+f

// tableau
Cypress.Commands.add("assertTableauSize", (t, i) => cy.get(`.tableau-${t}`).within(() => cy.get(".card").should("have.length", i)));
Cypress.Commands.add("clickOnTableau", (stack) => cy.get(`.tableau-${stack}`).within(() => cy.get(".card").last().click()));
Cypress.Commands.add("clickOnEmptyTableau", (stack) => cy.get(`.tableau-${stack}`).within(() => cy.get(".socket-empty").last().click()));
Cypress.Commands.add("clickOnTableauCard", (stack, card) =>
    cy.get(`.tableau-${stack}`).within(() => cy.get(".card").eq(card).get(".align-left").first().click())
);
Cypress.Commands.add("hasTableauSuggestion", (stack, card) =>
    cy.get(`.tableau-${stack}`).within(() => cy.get(".card").eq(card).should("have.class", "card-suggested"))
);
Cypress.Commands.add("hasNoTableauSuggestion", (stack) =>
    cy.get(`.tableau-${stack}`).within(() => cy.get(".card-suggested").should("not.exist"))
);
Cypress.Commands.add("hasNoTableauCardSuggestion", (stack, card) =>
    cy.get(`.tableau-${stack}`).within(() =>
        cy
            .get(".card")
            .eq(card)
            .should(($c) => $c.not(".card-suggested"))
    )
);

// foundation
Cypress.Commands.add("assertFoundationSize", (t, i) => cy.get(`.foundation-${t}`).within(() => cy.get(".card").should("have.length", i)));
Cypress.Commands.add("clickOnFoundation", (stack) => cy.get(`.foundation-${stack}`).within(() => cy.get(".card").last().click()));
Cypress.Commands.add("clickOnEmptyFoundation", (stack) =>
    cy.get(`.foundation-${stack}`).within(() => cy.get(".socket-empty").last().click())
);
Cypress.Commands.add("hasFoundationEmptySuggestion", (stack) =>
    cy.get(`.foundation-${stack}`).within(() => cy.get(".card-base").first().should("have.class", "socket-suggested"))
);
