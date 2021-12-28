/* eslint-disable no-undef */

Cypress.Commands.add("highlightShouldHaveTitle", (title) => cy.get(`button[title="${title}"].highlight`))//.should("have.class", "highlight"));

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
