describe("Single Player", () => {
    describe("In Game Menu", () => {
        beforeEach(() => {
            cy.withConfig((config) => {
                config.featureSwitches.shuffle = false;
                config.quickDeal = true;
                config.featureSwitches.confetti = false;
                config.featureSwitches.undo = false;
            }).visit("http://localhost:3000/solitaire");
            cy.contains("Single Player").click();
        });

        const assertMenuOpen = () => {
            cy.contains("Resume");
            cy.contains("Restart Game");
            cy.contains("Quit Game");
        };
        const openMenu = () => cy.get("body").type("{esc}");
        const closeAndReopen = () => cy.get("body").type("{q}").type("{esc}");

        it("Can be opened via button click", () => {
            cy.get('button[title="Settings"]').first().click();
            assertMenuOpen();
        });
        it("Can be opened via Escape Key", () => {
            cy.get("body").type("{esc}");
            assertMenuOpen();
        });
        it("Counts pauses until no pause left", () => {
            openMenu();
            cy.contains("You can pause the game 4 more times.");
            closeAndReopen();
            cy.contains("You can pause the game 3 more times.");
            closeAndReopen();
            cy.contains("You can pause the game 2 more times.");
            closeAndReopen();
            cy.contains("You can pause the game 1 more time.");
            closeAndReopen();
            cy.contains("This is the last remaining pause. If you continue, no more pause will be possible.");
            closeAndReopen();
            cy.contains("The game is not paused.");
        });

        //@todo test restart and quit
    });
});
