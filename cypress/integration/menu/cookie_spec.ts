describe("Cookie", () => {
    describe("Banner", () => {
        describe("without cookie", () => {
            beforeEach(() => {
                cy.visit("http://localhost:3000/solitaire");
            });
            it("shows a warning", () => {
                cy.contains("Options").click();
                cy.contains("Difficulty").click();
                cy.contains("Changes on this page will be lost after each game");
                cy.contains("Click here to give consent");
            });
            it("disappears on click", () => {
                cy.contains("Options").click();
                cy.contains("Difficulty").click();
                cy.contains("Click here to give consent").click();
                cy.contains("Click here to give consent").should("not.exist");
            });
            it("changes button on click", () => {
                cy.contains("Options").click();
                cy.contains("Difficulty").click();
                cy.contains("Allow Cookie");
                cy.get(".cookiebanner").click();
                cy.contains("Allow Cookie").should("not.exist");
                cy.contains("Delete Cookie");
            });
        });
        describe("with cookie", () => {
            it("Does not show warning with consent already giver", () => {
                cy.withConfig((c) => {}).visit("http://localhost:3000/solitaire");
                cy.contains("Options").click();
                cy.contains("Difficulty").click();
                cy.contains("Delete Cookie");
                cy.contains("Click here to give consent").should("not.exist");
            });
        });
    });
    describe("Button", () => {
        //@todo test dialog (and make it pretty too)
    });
});
