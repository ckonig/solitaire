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

    toggle3d = (stateholder, was3D) => {
        stateholder.setState((state) => {
            if (state.settings.is3D == was3D) {
                state.settings.is3D = !state.settings.is3D;
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
            toggle3d: () => this.toggle3d(stateholder, state.settings.is3D),
        };
    }
}
