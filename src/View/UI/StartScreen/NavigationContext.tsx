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
    closeScreen: () => void;
}

const startPos = { x: 0, y: 0 };
const defaultNavigationState = {
    menu: { ...startPos },
    screen: { ...startPos },
    focus: "menu",
    mainMenu: "",
    screeen: "",
};

const NavigationContext = React.createContext<INavigationContext>({
    navigation: defaultNavigationState,
    setNavigation: () => {},
    closeScreen: () => {},
});

export const NavigationProvider = (props: { children: any }) => {
    const [navigation, setNavigation] = React.useState(defaultNavigationState);
    const closeScreen = () =>
        setNavigation({
            ...navigation,
            focus: "menu",
            screeen: "",
            mainMenu: navigation.mainMenu,
            menu: { ...navigation.menu },
        });
    return <NavigationContext.Provider value={{ navigation, setNavigation, closeScreen }}>{props.children}</NavigationContext.Provider>;
};

const useNavigationContext = () => React.useContext(NavigationContext);

export default useNavigationContext;
