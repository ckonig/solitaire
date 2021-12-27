import SuggestionModes from "../../../../src/Model/Game/Settings/SuggestionModes";
import expectSuggestions from "./common";
import flow from "./flow";

describe("Single Player", () => {
    describe("Suggestions", () => {
        it("none", () => {
            flow(SuggestionModes.NONE, [
                () => expectSuggestions(() => {}),
                () => expectSuggestions(() => {}),
                () => expectSuggestions(() => {}),
                () => expectSuggestions(() => {}),
                () => expectSuggestions(() => {}),
                () => expectSuggestions(() => {}),
                () => expectSuggestions(() => {}),
                () => expectSuggestions(() => {}),
                () => expectSuggestions(() => {}),
                () => expectSuggestions(() => {}),
                () => expectSuggestions(() => {}),
            ]);
        });
    });
});
