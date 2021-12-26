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
        cy.visit("http://localhost:3000/solitaire");
        cy.contains("Options").click();
    });

    describe("Options", () => {
        describe("Difficulty Screen", () => {
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
            //@todo test individual toggle boxes
        });
    });
});
