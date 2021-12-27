import SuggestionModes from "../../../../src/Model/Game/Settings/SuggestionModes";
import expectSuggestions from "./common";
import flow from "./flow";

describe("Single Player", () => {
    describe("Suggestions", () => {
        it.only("scored", () => {
            flow(SuggestionModes.SCORED, [
                () => expectSuggestions(() => {}),
                () => expectSuggestions(() => {}),
                () => expectSuggestions((suggest) => (suggest.tableau = { ...suggest.tableau, 4: 1 })),
                () => expectSuggestions((suggest) => (suggest.tableau = { ...suggest.tableau })),
                () => expectSuggestions((suggest) => {}),
                () => expectSuggestions((suggest) => (suggest.waste = true)),
                () => expectSuggestions((suggest) => (suggest.foundation = { ...suggest.foundation, 1: true })),
                () => expectSuggestions((suggest) => (suggest.waste = true)),
                () => expectSuggestions((suggest) => (suggest.foundation = { ...suggest.foundation, 2: true })),
                () => {},
                () => {},
            ]);
        });
    });
});
