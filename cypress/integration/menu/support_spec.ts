describe("Menu", () => {
    describe("Options", () => {
        describe("Support Screen", () => {
            describe("without consent", () => {
                beforeEach(() => {
                    cy.visit("http://localhost:3000/solitaire");
                    cy.contains("Options").click();
                    cy.contains("Support").click();
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
                    it("Auto Resolve", () => validateSetting(1, 0, true));
                    it("Auto Uncover", () => validateSetting(1, 1, false));
                    it("Instant Deal", () => validateSetting(2, 0, false));
                    it("Auto Draw", () => validateSetting(2, 1, false));
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
                                expect(JSON.parse(localStorage.getItem("state"))[setting]).to.eq(!defaultValue)
                            );
                            cy.assertToggleContainer(r, i, !defaultValue);
                            cy.toggleToggleContainer(r, i).should(() =>
                                expect(JSON.parse(localStorage.getItem("state"))[setting]).to.eq(defaultValue)
                            );
                            cy.assertToggleContainer(r, i, defaultValue);
                        };
                        it("Auto Resolve", () => validateLocalStorage(1, 0, "autoResolve", true));
                        it("Auto Uncover", () => validateLocalStorage(1, 1, "autoUncover", false));
                        it("Instant Deal", () => validateLocalStorage(2, 0, "quickDeal", false));
                        it("Auto Draw", () => validateLocalStorage(2, 1, "speed", false));
                    });
                });
            });
            describe("with artifical config", () => {
                describe("overrides default config", () => {
                    const validatePreConfig = (r, i, setting, defaultValue) => {
                        cy.withConfig((config) => {
                            config[setting] = !defaultValue;
                        }).visit("http://localhost:3000/solitaire");
                        cy.contains("Options").click();
                        cy.contains("Support").click();
                        cy.assertToggleContainer(r, i, !defaultValue);
                    };
                    it("Auto Resolve", () => validatePreConfig(1, 0, "autoResolve", true));
                    it("Auto Uncover", () => validatePreConfig(1, 1, "autoUncover", false));
                    it("Instant Deal", () => validatePreConfig(2, 0, "quickDeal", false));
                    it("Auto Draw", () => validatePreConfig(2, 1, "speed", false));
                });
            });
        });
    });
});
