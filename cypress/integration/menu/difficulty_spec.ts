describe("Menu", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/solitaire");
        cy.contains("Options").click();
        cy.contains("Difficulty").click();
    });

    describe("Options", () => {
        describe("Difficulty Screen", () => {
            it("has basic elements", () => {
                cy.contains("No limit");
                cy.contains("Three passes");
                cy.contains("Only a single pass");
                cy.contains("Turn 1 card");
                cy.contains("Turn 3 cards");
            });
            it("has default preset", () => {
                cy.contains("Turn 1 card after the other from the Stock to the Waste.");
                cy.contains("Three passes through the deck. Waste can be recycled to Stock two times.");
            });
            describe("With consent", () => {
                it("it stores setings to local storage", () => {
                    cy.get(".cookiebanner").click();
                    cy.get(".content").within(() => {
                        cy.get(".row")
                            .eq(2)
                            .within(() => {
                                cy.get(".inactive-3")
                                    .click()
                                    .should(() => expect(JSON.parse(localStorage.getItem("state")).difficultySettings).to.eq(3));
                                cy.get(".active-3");
                            });
                        cy.get(".row")
                            .eq(1)
                            .within(() => {
                                cy.get(".inactive-0")
                                    .click()
                                    .should(() => expect(JSON.parse(localStorage.getItem("state")).difficultySettings).to.eq(0));
                                cy.get(".active-0");
                            });
                    });
                });
            });

            //@todo test settings handling without consent

            describe("with preloaded config", () => {
                it("overrides default config", () => {
                    cy.withConfig((config) => {
                        config.difficultySettings = 3;
                    }).visit("http://localhost:3000/solitaire");
                    cy.contains("Options").click();
                    cy.contains("Difficulty").click();
                    cy.get(".content").within(() => {
                        cy.get(".row")
                            .eq(2)
                            .within(() => {
                                cy.get(".active-3");
                                cy.get(".inactive-5")
                                    .click()
                                    .should(() => expect(JSON.parse(localStorage.getItem("state")).difficultySettings).to.eq(5));
                                cy.get(".active-5");
                            });
                    });
                });
            });
        });
    });
});
