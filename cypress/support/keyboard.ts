export interface ITestKeyboard {
    left: () => void;
    right: () => void;
    down: () => void;
    up: () => void;
    action: () => void;
    cancel: () => void;
    undo: () => void;
}

export class TestKeyboard implements ITestKeyboard {
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
