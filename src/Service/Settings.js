import Model from "../Model/Model";

export default class Settings {
    constructor(suggestor) {
        this.suggestor = suggestor;
    }

    beat = (stateholder) => {
        this.setBaseEntropy(stateholder, 4);
    };

    setBaseEntropy = (stateholder, lvl) => {
        stateholder.setState((state) => {
            state.settings.baseEntropy = lvl;
            return Model.setEntropy(state, state.settings.baseEntropy);
        });
    };

    setInteractionEntropy = (stateholder, lvl) => {
        stateholder.setState((state) => {
            state.settings.interactionEntropy = lvl;
            return state;
        });
    };

    setMouseMode = (stateholder, mm) => {
        stateholder.setState((state) => {
            state.settings.mouseMode = mm;
            this.suggestor.evaluateOptions(state);
            return state;
        });
    };

    setSuggestionMode = (stateholder, sm) => {
        stateholder.setState((state) => {
            if (state.settings.suggestionMode !== sm) {
                state.settings.suggestionMode = sm;
                this.suggestor.evaluateOptions(state);
            }
            return state;
        });
    };

    suggestOnce = (stateholder) => {
        stateholder.setState((state) => {
            const previous = state.settings.suggestionMode;
            state.settings.suggestionMode = "regular";
            this.suggestor.evaluateOptions(state);
            state.settings.suggestionMode = previous;
            return state;
        });
    };

    toggleMenu = (stateholder, menu) => {
        stateholder.setState((state) => {
            if (state.settings.showMenu == menu) {
                state.settings.showMenu = !state.settings.showMenu;
            }
            return state;
        });
    };

    getHandlers(stateholder) {
        return {
            beat: () => this.beat(stateholder),
            setBaseEntropy: (lvl) => this.setBaseEntropy(stateholder, lvl),
            setInteractionEntropy: (lvl) => this.setInteractionEntropy(stateholder, lvl),
            setMouseMode: (mm) => this.setMouseMode(stateholder, mm),
            setSuggestionMode: (sm) => this.setSuggestionMode(stateholder, sm),
            suggestOnce: () => this.suggestOnce(stateholder),
            toggleMenu: (menu) => this.toggleMenu(stateholder, menu),
        };
    }
}
