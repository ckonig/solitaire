/* eslint-disable no-undef */

import { gamepad, gamepads } from "../gamepad";

Cypress.Commands.add("gamepad", (i) => gamepad(i));
Cypress.Commands.add("connect", { prevSubject: "gamepad" }, (s) => s.connect());
Cypress.Commands.add("disconnect", { prevSubject: "gamepad" }, (s) => s.disconnect());
Cypress.Commands.add("pressButton", { prevSubject: "gamepad" }, (s, b) => s.pressButton(b));

Cypress.Commands.add("visitWithGamepad", (url) => cy.visit(url, gamepads().inject()));
