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

    toggleMenu = (gamestate, menu) => {
        gamestate.setState((state) => {
            console.debug('toggle')
            if (state.settings.showMenu == menu) {
                console.debug('inverting showmenu')
                state.settings.showMenu = !state.settings.showMenu;
            }
            return state;
        });
    };

    getHandlers(gamestate) {
        return {
            beat: () => this.beat(gamestate),
            setBaseEntropy: (lvl) => this.setBaseEntropy(gamestate, lvl),
            setInteractionEntropy: (lvl) => this.setInteractionEntropy(gamestate, lvl),
            setMouseMode: (mm) => this.setMouseMode(gamestate, mm),
            setSuggestionMode: (sm) => this.setSuggestionMode(gamestate, sm),
            suggestOnce: () => this.suggestOnce(gamestate),
            toggleMenu: (menu) => this.toggleMenu(gamestate, menu),
        };
    }
}
