/* eslint-disable no-undef */
describe("Menu", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/solitaire");
    });

    describe("Structure", () => {
        it("Has all main menu entries", () => {
            cy.contains("Single Player");
            cy.contains("Versus");
            cy.contains("Options");
            cy.contains("Allow Cookie");
        });

        it("Options has subitems", () => {
            cy.contains("Options").click();
            cy.contains("Difficulty");
            cy.contains("Penalties");
            cy.contains("Suggestions");
            cy.contains("Support");
            cy.contains("Entropy");
        });

        describe("keyboard navigation", () => {
            it.only("Up/down works as expected", () => {
                cy.getHighlight().shouldHaveTitle("Single Player");
                cy.navUp();
                cy.getHighlight().shouldHaveTitle("Allow Cookie");
                cy.navDown();
                cy.navDown();
                cy.getHighlight().shouldHaveTitle("Versus");
                cy.navDown();
                cy.getHighlight().shouldHaveTitle("Options");
                cy.navDown();
                cy.getHighlight().shouldHaveTitle("Allow Cookie");
                cy.navDown();
                cy.getHighlight().shouldHaveTitle("Single Player");
                cy.navDown();
                cy.navAction();
                cy.navDown();
                cy.getHighlight().shouldHaveTitle("Player 1");
                cy.navDown();
                cy.navDown();
                cy.navDown();
                cy.getHighlight().shouldHaveTitle("Options");
                cy.navUp();
                cy.getHighlight().shouldHaveTitle("Start");
            });
        });
        // @todo implement axis on fake gamepad
        // describe("gamepad navigation", () => {
        //     it.only("Up/down works as expected", () => {
        //         console.log(cy.gamepad());
        //         cy.gamepad().connect();
        //         cy.getHighlight().shouldHaveTitle("Single Player");
        //         cy.gamepad().press("down");
        //         cy.getHighlight().shouldHaveTitle("Allow Cookie");
        //         cy.gamepad().press("down");
        //         cy.gamepad().press("down");
        //         cy.getHighlight().shouldHaveTitle("Versus");
        //         cy.gamepad().press("down");
        //         cy.getHighlight().shouldHaveTitle("Options");
        //         cy.gamepad().press("down");
        //         cy.getHighlight().shouldHaveTitle("Allow Cookie");
        //         cy.gamepad().press("down");
        //         cy.getHighlight().shouldHaveTitle("Single Player");
        //         cy.gamepad().press("down");
        //         cy.gamepad().press("action");
        //         cy.gamepad().press("down");
        //         cy.getHighlight().shouldHaveTitle("Player 1");
        //         cy.gamepad().press("down");
        //         cy.gamepad().press("down");
        //         cy.gamepad().press("down");
        //         cy.getHighlight().shouldHaveTitle("Options");
        //         cy.gamepad().press("up");
        //         cy.getHighlight().shouldHaveTitle("Start");
        //     });
        // });
    });
});
