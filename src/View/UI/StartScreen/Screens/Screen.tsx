import Controls from "./Controls";
import Difficulty from "./Difficulty";
import QuickStart from "./QuickStart";
import Rating from "./Rating";
import React from "react";
import { NavigationContext } from "../Context";

const Screen = (props: { screen: string }) => {
    const { navigation, setNavigation } = React.useContext(NavigationContext);
    const closeScreen = () => {
        setNavigation({ ...navigation, focus: "menu", screeen: "", mainMenu: navigation.mainMenu, menu: { ...navigation.menu } });
    };
    const Wrap = (props: { children: any }) => (
        <div className="startscreen-layout">
            <div className="startscreen-jail">{props.children}</div>
        </div>
    );
    switch (props.screen) {
        case "rating":
            return (
                <Wrap>
                    <Rating closeScreen={closeScreen} />
                </Wrap>
            );
        case "difficulty":
            return (
                <Wrap>
                    <Difficulty closeScreen={closeScreen} />
                </Wrap>
            );
        case "settings":
            return (
                <Wrap>
                    <QuickStart closeScreen={closeScreen} />
                </Wrap>
            );
        case "controls0":
            return (
                <Wrap>
                    <Controls player={0} />
                </Wrap>
            );
        case "controls1":
            return (
                <Wrap>
                    <Controls player={1} />
                </Wrap>
            );
        default:
            return null;
    }
};

export default Screen;
