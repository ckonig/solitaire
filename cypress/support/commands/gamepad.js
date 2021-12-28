/* eslint-disable no-undef */

import { gamepad, gamepads } from "../gamepad";

Cypress.Commands.add("gamepad", (i) => gamepad(i));
Cypress.Commands.add("connect", { prevSubject: "gamepad" }, (s) => s.connect());
Cypress.Commands.add("disconnect", { prevSubject: "gamepad" }, (s) => s.disconnect());
Cypress.Commands.add("pressButton", { prevSubject: "gamepad" }, (s, b) => s.pressButton(b));
Cypress.Commands.add("down", { prevSubject: "gamepad" }, (s) => s.down());
Cypress.Commands.add("up", { prevSubject: "gamepad" }, (s) => s.up());
Cypress.Commands.add("left", { prevSubject: "gamepad" }, (s) => s.left());
Cypress.Commands.add("right", { prevSubject: "gamepad" }, (s) => s.right());
Cypress.Commands.add("action", { prevSubject: "gamepad" }, (s) => s.action());
Cypress.Commands.add("cancel", { prevSubject: "gamepad" }, (s) => s.cancel());
Cypress.Commands.add("menu", { prevSubject: "gamepad" }, (s) => s.menu());

Cypress.Commands.add("visitWithGamepad", (url) => cy.visit(url, gamepads().inject()));
