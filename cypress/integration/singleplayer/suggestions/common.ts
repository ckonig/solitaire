interface SuggestionExpectations {
    stock?: boolean;
    waste?: boolean;
    tableau: { [id: number]: number | number[] | boolean };
    foundation: { [id: number]: boolean };
}

const defaultExpectation = () =>
    ({
        waste: false,
        stock: false,
        tableau: { 0: false, 1: false, 2: false, 3: false, 4: false, 5: false, 6: false },
        foundation: { 0: false, 1: false, 2: false, 3: false },
    } as SuggestionExpectations);

const expectSuggestions = (mod: (suggest: SuggestionExpectations) => void) => {
    const expectation = defaultExpectation();
    mod(expectation);

    if (expectation.waste) {
        cy.hasWasteSuggestion();
    } else {
        cy.hasNoWasteSuggestion();
    }

    if (expectation.stock) {
        cy.hasStockSuggestion();
    } else {
        cy.hasNoStockSuggestion();
    }

    Object.keys(expectation.foundation).forEach((key) => {
        if (expectation.foundation[key] === true) {
            //@todo also check top card if not empty
            cy.hasFoundationEmptySuggestion(parseInt(key));
        } else if (expectation.foundation[key] === false) {
            cy.hasNoFoundationSuggestion(parseInt(key));
            cy.hasNoFoundationEmptySuggestion(parseInt(key));
        } else if (typeof expectation.foundation[key] === "number") {
            //@todo also check top card if not empty
            cy.hasFoundationSuggestion(parseInt(key));
        }
    });

    Object.keys(expectation.tableau).forEach((key) => {
        if (expectation.tableau[key] === true) {
            cy.hasTableauEmptySuggestion(parseInt(key));
        } else if (expectation.tableau[key] === false) {
            cy.hasNoTableauSuggestion(parseInt(key));
            cy.hasNoTableauEmptySuggestion(parseInt(key));
        }
        if (Array.isArray(expectation.tableau[key])) {
            expectation.tableau[key].forEach((element) => {
                cy.hasTableauCardSuggestion(parseInt(key), element);
            });
            //@todo validate there are no other suggestions in stack
        }
        if (typeof expectation.tableau[key] == "number") {
            cy.hasTableauCardSuggestion(parseInt(key), expectation.tableau[key]);
            //@todo check there is no other suggestion
        }
    });
};

export default expectSuggestions;
