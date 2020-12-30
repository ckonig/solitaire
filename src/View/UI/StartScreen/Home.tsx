import { defaultStartScreenState, NavigationProvider, NavigationState, Provider, StartScreenState } from "./Context";
import React from "react";
import Screen from "./Screens/Screen";
import StorageManager from "../StorageManager";
import { CookieContextProvider } from "../../Context";
import StartMenu from "./Menu/StartMenu";
import SuggestionModes from "../../../Model/Game/Settings/SuggestionModes";
import DifficultyOptions from "./DifficultyOptions";

const Home = (props: { start: (settings: any) => void }) => {
    const storage = new StorageManager();
    const [consented, setConsented] = React.useState<boolean>(!!storage.hasConsent());
    const previous = storage.getPreviousState();
    const [state, setState] = React.useState<StartScreenState>(previous ? previous : defaultStartScreenState);
    const [navigation, setNavigation] = React.useState<NavigationState>({
        menu: {
            x: 0,
            y: 0,
        },
        screen: {
            x: 0,
            y: 0,
        },
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
            ...state.entropySettings,
            players: { ...state.players },
            quickDeal: state.quickDeal,
            boardMode: boardMode,
            initialized: true,
            suggestionMode: state.ratingSettings.hintPenalty ? SuggestionModes.NONE : state.suggestionMode,
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
