/* eslint-disable no-undef */

Cypress.Commands.add("navDown", () => cy.get("body").type("{downarrow}"));
Cypress.Commands.add("navUp", () => cy.get("body").type("{uparrow}"));
Cypress.Commands.add("navAction", () => cy.get("body").type("{q}"));
