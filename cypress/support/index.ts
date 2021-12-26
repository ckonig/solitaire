import { FakeGamepad } from "./gamepad";

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        interface Chainable<Subject> {
            startWithGamepad: () => void;
            gamepad: (i: number) => FakeGamepad;
        }
    }
}

export {};
