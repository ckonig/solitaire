describe("Menu", () => {
    describe("Options", () => {
        describe("Performance Screen", () => {
            describe("without consent", () => {
                beforeEach(() => {
                    cy.visit("http://localhost:3000/solitaire");
                    cy.contains("Options").click();
                    cy.contains("Performance").click();
                });
                it("shows cookie banner", () => {
                    cy.contains("Changes on this page will be lost");
                });
                describe("changes settings in memory but not localStorage", () => {
                    const validateSetting = (r, i, defaultValue) => {
                        cy.assertToggleContainer(r, i, defaultValue);
                        cy.toggleToggleContainer(r, i).should(() => expect(JSON.parse(localStorage.getItem("state"))).to.eq(null));
                        cy.assertToggleContainer(r, i, !defaultValue);
                        cy.toggleToggleContainer(r, i).should(() => expect(JSON.parse(localStorage.getItem("state"))).to.eq(null));
                        cy.assertToggleContainer(r, i, defaultValue);
                    };
                    it("Undo Feature Switch", () => validateSetting(1, 0, true));
                    it("Confetti Switch", () => validateSetting(1, 1, true));
                });
                describe("when giving consent", () => {
                    beforeEach(() => {
                        cy.get(".cookiebanner").first().click();
                    });
                    it("shows no cookie banner", () => {
                        cy.contains("Changes on this page will be lost").should("not.exist");
                    });
                    describe("changes settings in localstorage", () => {
                        const validateLocalStorage = (r, i, setting, defaultValue) => {
                            cy.assertToggleContainer(r, i, defaultValue);
                            cy.toggleToggleContainer(r, i).should(() =>
                                expect(JSON.parse(localStorage.getItem("state")).featureSwitches[setting]).to.eq(!defaultValue)
                            );
                            cy.assertToggleContainer(r, i, !defaultValue);
                            cy.toggleToggleContainer(r, i).should(() =>
                                expect(JSON.parse(localStorage.getItem("state")).featureSwitches[setting]).to.eq(defaultValue)
                            );
                            cy.assertToggleContainer(r, i, defaultValue);
                        };
                        it("Undo Feature Switch", () => validateLocalStorage(1, 0, "undo", true));
                        it("Confetti Feature Switch", () => validateLocalStorage(1, 1, "confetti", true));
                    });
                });
            });
            describe("with artifical config", () => {
                describe("overrides default config", () => {
                    const validatePreConfig = (r, i, setting, defaultValue) => {
                        cy.withConfig((config) => {
                            config.featureSwitches[setting] = !defaultValue;
                        }).visit("http://localhost:3000/solitaire");
                        cy.contains("Options").click();
                        cy.contains("Performance").click();
                        cy.assertToggleContainer(r, i, !defaultValue);
                    };
                    it("Undo Feature Switch", () => validatePreConfig(1, 0, "undo", true));
                    it("Confetti Feature Switch", () => validatePreConfig(1, 1, "confetti", true));
                });
            });
        });
    });
});
