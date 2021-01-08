import { NavigationProvider, NavigationState, Provider, StartScreenState, defaultStartScreenState } from "./Context";

import { CookieContextProvider } from "../../Context";
import DifficultyOptions from "./DifficultyOptions";
import LaunchSettings from "../../../Model/Game/Settings/LaunchSettings";
import React from "react";
import Screen from "./Screens/Screen";
import StartMenu from "./Menu/StartMenu";
import StorageManager from "../StorageManager";

const Home = (props: { start: (settings: LaunchSettings) => void }) => {
    const storage = new StorageManager();
    const [consented, setConsented] = React.useState<boolean>(!!storage.hasConsent());
    const previous = storage.getPreviousState();
    const [state, setState] = React.useState<StartScreenState>(previous ? previous : defaultStartScreenState);
    const startPos = { x: 0, y: 0 };
    const [navigation, setNavigation] = React.useState<NavigationState>({
        menu: { ...startPos },
        screen: { ...startPos },
        focus: "menu",
        mainMenu: "",
        screeen: "",
    });
    const startScreenContext = {
        state,
        setState: (s: StartScreenState) => {
            setState(s);
            storage.store(s);
        },
    };
    const navigationContext = {
        navigation,
        setNavigation,
    };
    const cookieContext = {
        consented,
        setConsented,
    };

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
