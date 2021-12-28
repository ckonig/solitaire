type func = () => void;

//@todo test one-time suggestions too

const flow = (mode: string, expectations: func[]) => {
    cy.withConfig((config) => {
        config.featureSwitches.shuffle = false;
        config.suggestionMode = mode;
        config.quickDeal = true;
        config.featureSwitches.confetti = false;
        config.featureSwitches.undo = false;
        config.difficultySettings = 3;
    }).visit("http://localhost:3000/solitaire");
    cy.contains("Single Player").click();

    //@todo move assertions to callbacks. Use same flow for all suggestion mode tests.
    expectations[0]();
    cy.clickOnTableau(4);
    expectations[1]();
    cy.clickOnTableau(5);
    expectations[2]();
    cy.clickOnTableau(4);
    expectations[3]();
    cy.clickOnTableau(4);
    cy.clickOnTableau(5);
    cy.clickOnTableau(4);
    cy.clickOnTableauCard(5, 1);
    cy.clickOnTableau(4);
    cy.clickOnTableau(5);
    cy.clickOnTableauCard(4, 1);
    cy.clickOnTableau(6);
    cy.clickOnTableau(4);
    cy.clickOnTableau(2);
    cy.clickOnTableau(3);
    cy.clickOnTableau(2);
    cy.clickOnTableau(2);
    cy.clickOnTableau(6);
    cy.clickOnTableau(2);
    cy.clickOnTableau(0);
    cy.clickOnTableau(6);
    cy.clickOnTableau(0);
    expectations[4]();
    cy.dealFromStock();
    expectations[5]();
    [...Array(7)].forEach(() => cy.dealFromStock());
    cy.clickOnWaste();
    expectations[6]();
    cy.clickOnEmptyFoundation(1);
    expectations[7]();
    cy.clickOnWaste();
    expectations[8]();
    cy.clickOnEmptyFoundation(2);
    cy.clickOnWaste().clickOnEmptyFoundation(3);
    cy.clickOnWaste().clickOnFoundation(2);
    cy.clickOnWaste().clickOnFoundation(3);
    cy.clickOnWaste().clickOnEmptyFoundation(0);
    cy.clickOnWaste().clickOnFoundation(3);
    cy.clickOnWaste().clickOnFoundation(0);
    cy.clickOnWaste().clickOnFoundation(1);
    cy.clickOnWaste().clickOnFoundation(0);
    cy.clickOnWaste().clickOnFoundation(1);
    cy.clickOnWaste().clickOnFoundation(2);
    cy.clickOnWaste().clickOnFoundation(1);
    cy.clickOnWaste().clickOnFoundation(2);
    cy.clickOnWaste().clickOnFoundation(3);
    cy.clickOnWaste().clickOnFoundation(2);
    // @todo validate suggestions on filled foundation stack too
    expectations[9]();
    cy.clickOnWaste().clickOnFoundation(3);
    cy.clickOnWaste().clickOnFoundation(0);
    cy.clickOnWaste().clickOnFoundation(3);
    cy.clickOnWaste().clickOnFoundation(0);
    cy.clickOnWaste().clickOnFoundation(1);
    cy.clickOnWaste().clickOnFoundation(0);
    cy.clickOnWaste().clickOnFoundation(1);
    cy.clickOnWaste().clickOnFoundation(2);
    cy.clickOnTableau(0).clickOnFoundation(1).clickOnTableau(0);
    cy.clickOnTableau(1).clickOnFoundation(2).clickOnTableau(1);
    cy.clickOnTableau(0).clickOnFoundation(2).clickOnTableau(0);
    cy.clickOnTableauCard(3, 3).clickOnTableau(0).clickOnTableau(3);
    cy.clickOnTableau(3).clickOnTableau(2).clickOnTableau(3);
    cy.clickOnTableau(3).clickOnTableau(5).clickOnTableau(3);
    cy.clickOnTableau(4).clickOnTableau(3);

    cy.clickOnTableauCard(3, 0);
    //@todo check suggestions on empty tableau
    expectations[10]();
    cy.clickOnEmptyTableau(4);
};
export default flow;
