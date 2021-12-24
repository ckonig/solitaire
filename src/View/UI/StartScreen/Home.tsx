import { StartScreenProvider, StartScreenState, defaultStartScreenState } from "./StartScreenContext";

import AspectRatio from "../../../common/AspectRatio/AspectRatio";
import DifficultyOptions from "./DifficultyOptions";
import { LaunchSettings } from "../../../Common";
import { NavigationProvider } from "./Navigation/NavigationContext";
import Ratios from "../../../common/AspectRatio/Ratios";
import React from "react";
import Screen from "./Screens/Screen";
import StartMenu from "./Menu/StartMenu";
import StorageManager from "../StorageManager";

const Home = (props: { start: (settings: LaunchSettings) => void }) => {
    const storage = StorageManager.getInstance();
    const previous = storage.getPreviousState();
    const [state, setState] = React.useState<StartScreenState>(previous ? previous : defaultStartScreenState);
    const startScreenContext = {
        state,
        setState: (s: StartScreenState) => {
            setState(s);
            storage.store(s);
        },
    };

    const start = (boardMode: string) => {
        const settings = {
            ...DifficultyOptions[state.difficultySettings].settings,
            ...state.ratingSettings,
            baseEntropy: state.entropySettings.baseEntropy || 0,
            interactionEntropy: state.entropySettings.interactionEntropy || 0,
            players: { ...state.players },
            quickDeal: state.quickDeal,
            speed: state.speed,
            autoUncover: state.autoUncover,
            autoResolve: state.autoResolve,
            boardMode: boardMode,
            initialized: true,
            suggestionMode: state.suggestionMode,
            inputMode: "",
        };
        props.start(settings);
    };

    return (
        <AspectRatio ratio={Ratios._16to9}>
            <StartScreenProvider value={startScreenContext}>
                <NavigationProvider>
                    <StartMenu start={start} />
                    <Screen />
                </NavigationProvider>
            </StartScreenProvider>
        </AspectRatio>
    );
};
export default Home;
