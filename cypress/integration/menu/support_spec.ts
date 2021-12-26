describe("Menu", () => {
    describe("Options", () => {
        describe("Support Screen", () => {
            beforeEach(() => {
                cy.visit("http://localhost:3000/solitaire");
                cy.contains("Options").click();
                cy.contains("Support").click();
            });
            it("has basic elements", () => {
                cy.contains("Auto Resolve");
                cy.contains("Auto Uncover");
                cy.contains("Instant Deal");
                cy.contains("Auto Draw");
            });
            describe("Without consent", () => {
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
            });
            describe("With consent", () => {
                beforeEach(() => {
                    cy.get(".cookiebanner").first().click();
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
                //@todo test with keyboard
            });
        });
    });
});
