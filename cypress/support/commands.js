/* eslint-disable no-undef */

import defaultConfig from "./defaultConfig";

Cypress.Commands.add("withConfig", (mod) => {
    const config = defaultConfig;
    mod(config);
    localStorage.setItem("consent", JSON.stringify(1));
    localStorage.setItem("state", JSON.stringify(config));
});
