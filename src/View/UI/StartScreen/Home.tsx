import { StartScreenProvider, StartScreenState, defaultStartScreenState } from "./StartScreenContext";

import AspectRatio from "../../../common/AspectRatio/AspectRatio";
import { CookieContextProvider } from "../CookieContext";
import DifficultyOptions from "./DifficultyOptions";
import { LaunchSettings } from "../../../Common";
import { NavigationProvider } from "./NavigationContext";
import Ratios from "../../../common/AspectRatio/Ratios";
import React from "react";
import Screen from "./Screens/Screen";
import StartMenu from "./Menu/StartMenu";
import StorageManager from "../StorageManager";

const Home = (props: { start: (settings: LaunchSettings) => void }) => {
    const storage = new StorageManager();
    const previous = storage.getPreviousState();
    const [state, setState] = React.useState<StartScreenState>(previous ? previous : defaultStartScreenState);
    const startScreenContext = {
        state,
        setState: (s: StartScreenState) => {
            setState(s);
            storage.store(s);
        },
    };

    const [consented, setConsented] = React.useState<boolean>(!!storage.hasConsent());
    const cookieContext = {
        consented,
        setConsented,
    };

    //@todo start() can be defined in StartScreenContext
    const start = (boardMode: string) => {
        const settings = {
            ...DifficultyOptions[state.difficultySettings].settings,
            ...state.ratingSettings,
            baseEntropy: state.entropySettings.baseEntropy || 0,
            interactionEntropy: state.entropySettings.interactionEntropy || 0,
            players: { ...state.players },
            quickDeal: state.quickDeal,
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
                    <CookieContextProvider value={cookieContext}>
                        <StartMenu start={start} />
                        <Screen />
                    </CookieContextProvider>
                </NavigationProvider>
            </StartScreenProvider>
        </AspectRatio>
    );
};
export default Home;
