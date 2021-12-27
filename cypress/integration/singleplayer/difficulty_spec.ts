describe("SinglePlayer", () => {
    describe("Difficulty", () => {
        const validateDraw = (i, j) => {
            cy.withConfig((config) => {
                config.quickDeal = true;
                config.featureSwitches.confetti = false;
                config.featureSwitches.undo = false;
                config.difficultySettings = i;
            }).visit("http://localhost:3000/solitaire");
            cy.contains("Single Player").click();
            cy.dealFromStock().assertWasteSize(j);
        };
        describe("draw behavior", () => {
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
        describe("heart icons", () => {
            const validateHearts = (i, nrOfHearts) => {
                cy.withConfig((config) => {
                    config.quickDeal = true;
                    config.difficultySettings = 0;
                }).visit("http://localhost:3000/solitaire");
                cy.contains("Single Player").click();
                cy.get(".heart-container").within(() => {
                    cy.get("svg").should("have.length", 1);
                });
            };
            describe("no limit shows 1 heart", () => {
                //@todo differentiate single icons
                //then test hearts changing through recycling
                it("single draw", () => validateHearts(0, 1));
                it("triple draw", () => validateHearts(3, 1));
            });
            describe("1 pass shows 1 heart", () => {
                //@todo differentiate single icons
                //then test hearts changing through recycling
                it("single draw", () => validateHearts(1, 1));
                it("triple draw", () => validateHearts(4, 1));
            });
            describe("3 pass shows three hearts", () => {
                //@todo differentiate single icons
                //then test hearts changing through recycling
                it("single draw", () => validateHearts(2, 3));
                it("triple draw", () => validateHearts(5, 3));
            });
        });

        //@todo mock desk to actually validate recycling, but efficiently
    });
});
