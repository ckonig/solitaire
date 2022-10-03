import keyboard from "../../support/keyboard";

describe("In Game Navigation", () => {
    beforeEach(() => {
        cy.withConfig((config) => {
            config.featureSwitches.shuffle = false;
            config.featureSwitches.confetti = false;
            config.featureSwitches.undo = false;
            config.quickDeal = true;
        })
            .visitWithGamepad("http://localhost:3000/solitaire")
            .contains("Single Player")
            .click();
        cy.contains("00:02");
    });
    
    const flow: (nav: () => any) => void = (nav) => {
        nav().right();
        cy.get(".board-field.waste").within(() => cy.get(".socket-focused"));
        nav().right();
        cy.get(".foundation-0").within(() => cy.get(".socket-focused"));
        nav().down();
        cy.get(".tableau-3").within(() => cy.get(".card-focused"));
        nav().left();
        cy.get(".tableau-2").within(() => cy.get(".card-focused"));
        nav().left();
        cy.get(".tableau-1").within(() => cy.get(".card-focused"));
        nav().up();
        cy.get(".board-field.waste").within(() => cy.get(".socket-focused"));
        nav().left();
        cy.get(".board-field.stock").within(() => cy.get(".card-focused"));
        nav().left();
        cy.get(".foundation-3").within(() => cy.get(".socket-focused"));
        nav().up();
        cy.get(".tableau-6").within(() => cy.get(".card-focused"));
        //@todo test more advanced scenarios with stacks of uncovered cards
    };

    it("works with keyboard", () => {
        flow(() => keyboard());
    });

    it("works with gamepad", () => {
        cy.gamepad(0).connect();
        flow(() => cy.gamepad(0));
    });
});
