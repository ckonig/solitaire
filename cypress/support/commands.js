/* eslint-disable no-undef */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("getHighlight", () => cy.get(".highlight"));

Cypress.Commands.add("navDown", () => cy.get("body").type("{downarrow}"));

Cypress.Commands.add("navUp", () => cy.get("body").type("{uparrow}"));

Cypress.Commands.add("navAction", () => cy.get("body").type("{q}"));

Cypress.Commands.add("shouldHaveTitle", { prevSubject: "element" }, (subject, options) => {
    return cy.wrap(subject).invoke("attr", "title").should("eq", options);
});
