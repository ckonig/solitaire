describe("SinglePlayer", () => {
    describe("New Game", () => {
        const validateBoard = (wait = undefined) => {
            cy.assertStockSize(24, wait)
                .assertWasteSize(0)
                .assertTableauSize(0, 7)
                .assertTableauSize(1, 6)
                .assertTableauSize(2, 5)
                .assertTableauSize(3, 4)
                .assertTableauSize(4, 3)
                .assertTableauSize(5, 2)
                .assertTableauSize(6, 1)
                .assertFoundationSize(0, 0)
                .assertFoundationSize(1, 0)
                .assertFoundationSize(2, 0)
                .assertFoundationSize(3, 0)
                .assertUncoveredCardsCount(7);
        };
        describe("Dealer", () => {
            it("slow dealer deals gradually", () => {
                cy.visit("http://localhost:3000/solitaire");
                cy.contains("Single Player").click();
                // assert cards are dealt gradually
                cy.assertTableauSize(5, 1)
                    .assertTableauSize(4, 2)
                    .assertTableauSize(3, 3)
                    .assertTableauSize(2, 4)
                    .assertTableauSize(1, 5)
                    .assertTableauSize(0, 6);
                validateBoard();
            });

            it("quick dealer deals instantly", () => {
                cy.withConfig((config) => {
                    config.quickDeal = true;
                }).visit("http://localhost:3000/solitaire");
                cy.contains("Single Player").click();
                //force stock size to be updated after 1ms
                validateBoard(1);
            });
        });
    });
});
