describe("SinglePlayer", () => {
    describe("Undo", () => {
        const undoButton = () => cy.get('button[title="Undo"]');
        describe("when enabled", () => {
            beforeEach(() => {
                cy.withConfig((config) => {
                    config.quickDeal = true;
                    config.difficultySettings = 3;
                }).visit("http://localhost:3000/solitaire");
                cy.contains("Single Player").click();
            });

            it("undo button is only shown when there is something to undo", () => {
                undoButton().should("not.exist");
                cy.dealFromStock();
                undoButton().click();
                undoButton().should("not.exist");
            });
            it("undo button can move cards from waste back to stock", () => {
                cy.assertStockSize(24).dealFromStock().assertWasteSize(3).assertStockSize(21);
                undoButton().click();
                cy.assertWasteSize(0).assertStockSize(24);
            });
            it("Ctrl+Z works like the undo button", () => {
                cy.assertStockSize(24).dealFromStock().assertWasteSize(3).assertStockSize(21);
                cy.get("body").type("{ctrl}z");
                cy.assertWasteSize(0).assertStockSize(24);
            });

            // @todo test undo penalty
            // @todo test that time is not affected
            // @todo with mocked deck test 1 or 2 other game moves\
            // @todo with mocked deck test the uncover / confetti undo bug, then fix it
        });

        describe("when disabled", () => {
            beforeEach(() => {
                cy.withConfig((config) => {
                    config.quickDeal = true;
                    config.difficultySettings = 3;
                    config.featureSwitches.undo = false;
                }).visit("http://localhost:3000/solitaire");
                cy.contains("Single Player").click();
            });
            it("undo button not shown even when there is something to undo", () => {
                undoButton().should("not.exist");
                cy.dealFromStock();
                undoButton().should("not.exist");
            });

            it("Ctrl+Z does not work either", () => {
                cy.assertWasteSize(0).assertStockSize(24);
                cy.dealFromStock();
                cy.assertWasteSize(3).assertStockSize(21);
                cy.get("body").type("{ctrl}z");
                cy.assertWasteSize(3).assertStockSize(21);
            });
        });
    });
});