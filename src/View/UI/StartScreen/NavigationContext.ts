import React from "react";

export interface NavigationState {
    menu: {
        x: number;
        y: number;
    };
    screen: {
        x: number;
        y: number;
    };
    focus: string;
    mainMenu: string;
    screeen: string;
}
interface INavigationContext {
    navigation: NavigationState;
    setNavigation: (n: NavigationState) => void;
}

const NavigationContext = React.createContext<INavigationContext>({
    navigation: {
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
    },
    setNavigation: () => {},
});

export const NavigationProvider = NavigationContext.Provider;

const useNavigationContext = () => React.useContext(NavigationContext);

export default useNavigationContext;
