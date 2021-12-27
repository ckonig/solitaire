/* eslint-disable no-undef */

Cypress.Commands.add("getHighlight", () => cy.get(".highlight"));
Cypress.Commands.add("shouldHaveTitle", { prevSubject: "element" }, (subject, options) => {
    return cy.wrap(subject).invoke("attr", "title").should("eq", options);
});

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
