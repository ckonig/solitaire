/* eslint-disable no-undef */
describe("SinglePlayer", () => {
    describe("New Game", () => {
        before(() => {
            cy.withConfig((config) => {
                config.quickDeal = true;
            }).visit("http://localhost:3000/solitaire");
            cy.contains("Single Player").click();
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
