import Facade from "../Model/Facade";

export default class Settings {
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
            return state;
        });
    };

    toggleShowSuggestions = (stateholder, showSuggestions) => {
        stateholder.setState((state) => {
            if (state.settings.showSuggestions == showSuggestions) {
                state.settings.showSuggestions = !state.settings.showSuggestions;
            }
            return state;
        });
    };

    getHandlers(stateholder, state) {
        return {
            beat: () => this.beat(stateholder),
            setBaseEntropy: (lvl) => this.setBaseEntropy(stateholder, lvl),
            setInteractionEntropy: (lvl) => this.setInteractionEntropy(stateholder, lvl),
            setMouseMode: (mm) => this.setMouseMode(stateholder, mm),
            toggleShowSuggestions: () => this.toggleShowSuggestions(stateholder, state.settings.showSuggestions),
        };
    }
}
