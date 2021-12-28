//@todo test heart containers in header
describe("Recycling", () => {
    const start = (difficulty) => {
        cy.withConfig((c) => {
            c.featureSwitches.undo = false;
            c.quickDeal = true;
            c.featureSwitches.confetti = false;
            c.difficultySettings = difficulty;
        })
            .visitWithGamepad("http://localhost:3000/solitaire")
            .contains("Single Player")
            .click();
        cy.contains("00:02");
    };
    it("works four and hopefully more times with no limit", () => {
        start(3);
        [...Array(8)].forEach(() => cy.dealFromStock());
        cy.recycle();
        [...Array(8)].forEach(() => cy.dealFromStock());
        cy.recycle();
        [...Array(8)].forEach(() => cy.dealFromStock());
        cy.recycle();
        [...Array(8)].forEach(() => cy.dealFromStock());
        cy.assertStockSize(0);
        cy.recycle();
        cy.assertStockSize(24);
    });
    it("works two times with three passes", () => {
        start(4);
        [...Array(8)].forEach(() => cy.dealFromStock());
        cy.recycle();
        [...Array(8)].forEach(() => cy.dealFromStock());
        cy.assertStockSize(0);
        cy.recycle();
        cy.assertStockSize(24);
        [...Array(8)].forEach(() => cy.dealFromStock());
        cy.assertStockSize(0);
        cy.recycle();
        cy.assertStockSize(0);
    });
    it("does not work with one pass", () => {
        start(5);
        [...Array(8)].forEach(() => cy.dealFromStock());
        cy.assertStockSize(0);
        cy.recycle();
        cy.assertStockSize(0);
    });
});
