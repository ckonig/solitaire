export interface ITestKeyboard {
    left: () => Cypress.Chainable;
    right: () => Cypress.Chainable;
    down: () => Cypress.Chainable;
    up: () => Cypress.Chainable;
    action: () => Cypress.Chainable;
    cancel: () => Cypress.Chainable;
    undo: () => Cypress.Chainable;
}

class TestKeyboard implements ITestKeyboard {
    type = (cmd: string) => cy.get("body").type(cmd);
    left = () => this.type("{leftarrow}");
    right = () => this.type("{rightarrow}");
    down = () => this.type("{downarrow}");
    up = () => this.type("{uparrow}");
    action = () => this.type("q");
    cancel = () => this.type("{esc}");
    undo = () => this.type("{ctrl}z");
}

const _keyboard = new TestKeyboard();
const keyboard = () => _keyboard;
export default keyboard;
