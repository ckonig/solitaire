import Model from "../Model/Model";

export default class Settings {
    constructor(suggestor, stateholder) {
        this.suggestor = suggestor;
        this.stateholder = stateholder;
    }

    setBaseEntropy = (lvl) => {
        this.stateholder.setState((state) => {
            state.settings.baseEntropy = lvl;
            return Model.setEntropy(state, state.settings.baseEntropy);
        });
    };

    setInteractionEntropy = (lvl) => {
        this.stateholder.setState((state) => {
            state.settings.interactionEntropy = lvl;
            return state;
        });
    };

    setMouseMode = (mm) => {
        this.stateholder.setState((state) => {
            state.settings.mouseMode = mm;
            this.suggestor.evaluateOptions(state);
            return state;
        });
    };

    setSuggestionMode = (sm) => {
        this.stateholder.setState((state) => {
            if (state.settings.suggestionMode !== sm) {
                state.settings.suggestionMode = sm;
                this.suggestor.evaluateOptions(state);
            }
            return state;
        });
    };

    suggestOnce = () => {
        this.stateholder.setState((state) => {
            const previous = state.settings.suggestionMode;
            state.settings.suggestionMode = "regular";
            this.suggestor.evaluateOptions(state);
            state.settings.suggestionMode = previous;
            return state;
        });
    };

    toggleMenu = (menu) => {
        this.stateholder.setState((state) => {
            if (state.settings.showMenu == menu) {
                state.settings.showMenu = !state.settings.showMenu;
            }
            return state;
        });
    };
}
