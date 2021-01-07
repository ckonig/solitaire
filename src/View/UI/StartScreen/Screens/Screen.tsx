import Controls from "./Controls";
import Difficulty from "./Difficulty";
import { NavigationContext } from "../Context";
import QuickStart from "./QuickStart";
import Rating from "./Rating";
import React from "react";
import Suggestions from "./Suggestions";

const Screen = (props: { screen: string }) => {
    const { navigation, setNavigation } = React.useContext(NavigationContext);
    const closeScreen = () => {
        const prev = { ...navigation.menu };
        setNavigation({ ...navigation, focus: "menu", screeen: "", mainMenu: navigation.mainMenu, menu: prev });
    };
    return (
        <div className="startscreen-layout">
            <div className="startscreen-jail">
                {props.screen == "rating" ? <Rating closeScreen={closeScreen} /> : null}
                {props.screen == "difficulty" ? <Difficulty closeScreen={closeScreen} /> : null}
                {props.screen == "settings" ? <QuickStart closeScreen={closeScreen} /> : null}
                {props.screen == "suggestions" ? <Suggestions closeScreen={closeScreen} /> : null}
                {props.screen == "controls0" ? <Controls player={0} closeScreen={closeScreen} /> : null}
                {props.screen == "controls1" ? <Controls player={1} closeScreen={closeScreen} /> : null}
            </div>
        </div>
    );
};

export default Screen;
