import keyboard from "../../support/keyboard";

const assertHintPenalty = (value) => cy.assertToggleContainer(3, 0, value);
const assertMissPenalty = (value) => cy.assertToggleContainer(3, 1, value);
const assertUndoPenalty = (value) => cy.assertToggleContainer(2, 0, value);
const assertTimePenalty = (value) => cy.assertToggleContainer(2, 1, value);

const assertPreset = (undo, time, hint, miss) => {
    assertUndoPenalty(undo);
    assertTimePenalty(time);
    assertHintPenalty(hint);
    assertMissPenalty(miss);
};

const assertEasyPreset = () => assertPreset(0, 0, 0, 0);
const assertMediumPreset = () => assertPreset(1, 1, 0, 0);
const assertHardPreset = () => assertPreset(1, 1, 1, 1);

describe("Menu", () => {
    beforeEach(() => {
        cy.visitWithGamepad("http://localhost:3000/solitaire");
        cy.contains("Options").click();
    });

    describe("Options", () => {
        describe("Penalties Screen", () => {
            beforeEach(() => {
                cy.contains("Penalties").click();
            });
            it("has basic elements", () => {
                cy.contains("Chill");
                cy.contains("Regular");
                cy.contains("Competitive");
                cy.contains("Undo Penalty");
                cy.contains("Time Penalty");
                cy.contains("Hint Penalty");
                cy.contains("Miss Penalty");
            });
            it("shows cookie banner", () => {
                cy.contains("Changes on this page will be lost");
            });
            describe("presets", () => {
                it("has default preset", () => {
                    cy.get(".content").within(() => {
                        cy.get(".row")
                            .eq(1)
                            .within(() => cy.get(".active-1"));
                        assertMediumPreset();
                    });
                });
                it("can switch to easy preset", () => {
                    cy.get(".row").eq(1).get(".inactive-0").first().click();
                    assertEasyPreset();
                });
                it("can switch to hard preset", () => {
                    cy.get(".row").eq(1).get(".inactive-2").last().click();
                    assertHardPreset();
                });
            });
            //@todo test individual toggle boxes with localStorage and connection with presets
            describe("Navigation", () => {
                const flow = (nav: any) => {
                    cy.get(".active-1.focused");
                    nav().left();
                    cy.get(".inactive-0.focused");
                    nav().left();
                    cy.get(".inactive-2.focused");
                    nav().left();
                    cy.get(".active-1.focused");
                    nav().left();
                    nav().down();
                    cy.get(".row")
                        .eq(2)
                        .within(() => cy.get(".togglecontainer").first().should("have.class", "focused"));
                    nav().right();
                    cy.get(".row")
                        .eq(2)
                        .within(() => cy.get(".togglecontainer").last().should("have.class", "focused"));
                    nav().down();
                    nav().down();
                    cy.get(".cookiebanner.focused");
                    nav().down();
                    cy.get(".inactive-0.focused");
                    nav().up();
                    cy.get(".cookiebanner.focused");
                    nav().action();
                    cy.get(".inactive-0.focused");
                    nav().right();
                    cy.get(".active-1.focused");
                    nav().right();
                    cy.get(".inactive-2.focused");
                    nav().down();
                    cy.get(".row")
                        .eq(2)
                        .within(() => cy.get(".togglecontainer").last().should("have.class", "focused"));
                    nav().down();
                    cy.get(".row")
                        .eq(3)
                        .within(() => cy.get(".togglecontainer").last().should("have.class", "focused"));
                    nav().action();
                    cy.get(".inactive-1");
                    nav().action();
                    cy.get(".active-1");
                    nav().down();
                    cy.get(".active-1.focused");
                };
                it("works with keyboard", () => {
                    flow(() => keyboard());
                });
                it("works with keyboard", () => {
                    flow(() => cy.gamepad(0));
                });
            });
        });
    });
});
