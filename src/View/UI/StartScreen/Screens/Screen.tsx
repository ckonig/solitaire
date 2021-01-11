import Controls from "./Controls";
import Difficulty from "./Difficulty";
import { NavigationContext } from "../Context";
import QuickStart from "./QuickStart";
import Rating from "./Rating";
import React from "react";
import ScreenContext from "./Context";
import Suggestions from "./Suggestions";

const Screen = (props: { screen: string }) => {
    //@todo screen can be taken from navigation context, passed to innner renderer here
    //@todo load this screen after 1st selection incl. toggles and gamepads as asynchronous components
    const { navigation, setNavigation } = React.useContext(NavigationContext);
    //@todo closeScreen can be defined in navigationContext
    const closeScreen = () =>
        setNavigation({
            ...navigation,
            focus: "menu",
            screeen: "",
            mainMenu: navigation.mainMenu,
            menu: { ...navigation.menu },
        });

    //@todo add credits page
    return (
        <ScreenContext.Provider value={{ closeScreen: () => closeScreen() }}>
            <div className="startscreen-layout">
                <div className="startscreen-jail">
                    {props.screen == "rating" ? <Rating /> : null}
                    {props.screen == "difficulty" ? <Difficulty /> : null}
                    {props.screen == "settings" ? <QuickStart /> : null}
                    {props.screen == "suggestions" ? <Suggestions /> : null}
                    {props.screen == "controls0" ? <Controls player={0} /> : null}
                    {props.screen == "controls1" ? <Controls player={1} /> : null}
                </div>
            </div>
        </ScreenContext.Provider>
    );
};

export default Screen;
