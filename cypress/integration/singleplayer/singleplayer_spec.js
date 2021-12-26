/* eslint-disable no-undef */
describe("SinglePlayer", () => {
    describe("New Game", () => {
        before(() => {
            cy.visit("http://localhost:3000/solitaire");
            cy.contains("Single Player").click();
        });

        it("deals cards correctly", () => {
            cy.assertStockSize(24)
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
        });

        it("Stock can move 1 card to waste by click", () => {
            cy.assertStockSize(24)
                .assertWasteSize(0)
                .assertUncoveredCardsCount(7)
                .dealFromStock()
                .assertStockSize(23)
                .assertWasteSize(1)
                .assertUncoveredCardsCount(8);
        });

        // @todo deal stock via keyboard action
        // @todo deal stock via gamepad action
    });
});
