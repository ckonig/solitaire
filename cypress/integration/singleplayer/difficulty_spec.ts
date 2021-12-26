describe("SinglePlayer", () => {
    describe("Difficulty", () => {
        const validateDraw = (i, j) => {
            cy.withConfig((config) => {
                config.quickDeal = true;
                config.difficultySettings = i;
            }).visit("http://localhost:3000/solitaire");
            cy.contains("Single Player").click();
            cy.dealFromStock().assertWasteSize(j);
        };
        describe("single draw pulls one card from stock to waste ", () => {
            it("no limit", () => validateDraw(0, 1));
            it("three passes", () => validateDraw(1, 1));
            it("single pass", () => validateDraw(2, 1));
        });
        describe("triple draw pulls three cards from stock to waste", () => {
            it("no limit", () => validateDraw(3, 3));
            it("three passes", () => validateDraw(4, 3));
            it("single pass", () => validateDraw(5, 3));
        });
    });

    //@todo validate heartContainer content based on difficulty
    //@todo mock desk to validate recycling efficiently
});
