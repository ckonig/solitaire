import { NavigationProvider, NavigationState, Provider, StartScreenState, defaultStartScreenState } from "./Context";

import { CookieContextProvider } from "../../Context";
import DifficultyOptions from "./DifficultyOptions";
import { LaunchSettings } from "../../../Common";
import React from "react";
import Screen from "./Screens/Screen";
import StartMenu from "./Menu/StartMenu";
import StorageManager from "../StorageManager";

const Home = (props: { start: (settings: LaunchSettings) => void }) => {
    const storage = new StorageManager();

    //@todo wrap into custom hook
    const startPos = { x: 0, y: 0 };
    const [navigation, setNavigation] = React.useState<NavigationState>({
        menu: { ...startPos },
        screen: { ...startPos },
        focus: "menu",
        mainMenu: "",
        screeen: "",
    });
    const navigationContext = {
        navigation,
        setNavigation,
    };

    //@todo wrap into custom hook
    const previous = storage.getPreviousState();
    const [state, setState] = React.useState<StartScreenState>(previous ? previous : defaultStartScreenState);
    const startScreenContext = {
        state,
        setState: (s: StartScreenState) => {
            setState(s);
            storage.store(s);
        },
    };
    
    //@todo wrap into custom hook
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
        <Provider value={startScreenContext}>
            <NavigationProvider value={navigationContext}>
                <CookieContextProvider value={cookieContext}>
                    <StartMenu start={start} />
                    <Screen screen={navigation.screeen} />
                </CookieContextProvider>
            </NavigationProvider>
        </Provider>
    );
};
export default Home;
