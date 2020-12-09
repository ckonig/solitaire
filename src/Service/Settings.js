import Facade from "../Model/Facade";

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
            stateholder.setState((state) => Facade.setEntropy(state, state.settings.baseEntropy));
            return state;
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

    toggleShowSuggestions = (stateholder, showSuggestions) => {
        stateholder.setState((state) => {
            if (state.settings.showSuggestions == showSuggestions) {
                state.settings.showSuggestions = !state.settings.showSuggestions;
                this.suggestor.evaluateOptions(state);
            }
            return state;
        });
    };

    getHandlers(gamestate, state) {
        return {
            beat: () => this.beat(gamestate),
            setBaseEntropy: (lvl) => this.setBaseEntropy(gamestate, lvl),
            setInteractionEntropy: (lvl) => this.setInteractionEntropy(gamestate, lvl),
            setMouseMode: (mm) => this.setMouseMode(gamestate, mm),
            toggleShowSuggestions: () => this.toggleShowSuggestions(gamestate, state.settings.showSuggestions),
        };
    }
}
