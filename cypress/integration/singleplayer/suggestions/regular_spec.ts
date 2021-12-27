import SuggestionModes from "../../../../src/Model/Game/Settings/SuggestionModes";
import expectSuggestions from "./common";
import flow from "./flow";

describe("Single Player", () => {
    describe("Suggestions", () => {
        it("regular", () => {
            flow(SuggestionModes.REGULAR, [
                () => expectSuggestions((suggest) => (suggest.tableau = { ...suggest.tableau, 1: 5, 2: 4, 4: 2 })),
                () => expectSuggestions((suggest) => (suggest.tableau = { ...suggest.tableau, 5: 1 })),
                () => expectSuggestions((suggest) => (suggest.tableau = { ...suggest.tableau, 4: 1 })),
                () => expectSuggestions((suggest) => (suggest.tableau = { ...suggest.tableau, 1: 5, 2: 4, 4: 1, 5: 1 })),
                () => expectSuggestions((suggest) => (suggest.stock = true)),
                () => expectSuggestions((suggest) => (suggest.waste = true)),
                () => expectSuggestions((suggest) => (suggest.foundation = { ...suggest.foundation, 1: true })),
                () => expectSuggestions((suggest) => (suggest.waste = true)),
                () => expectSuggestions((suggest) => (suggest.foundation = { ...suggest.foundation, 2: true })),
                () => {},
                () => expectSuggestions((suggest) => (suggest.tableau = { ...suggest.tableau, 4: true })),
            ]);
        });
    });
});
