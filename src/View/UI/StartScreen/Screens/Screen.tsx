import Controls from "./Controls";
import Difficulty from "./Difficulty";
import QuickStart from "./QuickStart";
import Rating from "./Rating";
import React from "react";
import Suggestions from "./Suggestions";
import Support from "./Support";
import useNavigationContext from "../NavigationContext";

const Screen = () => {
    //@todo load this screen after 1st selection incl. toggles and gamepads as asynchronous components
    const { navigation } = useNavigationContext();
    return <_Screen screen={navigation.screeen} />;
    //@todo monitor gamepad connections, show toast when pad is connected
};

const _Screen = (props: { screen: string }) => {
    //@todo add credits page
    return (
        <div className="startscreen-layout">
            <div className="startscreen-jail">
                {props.screen == "rating" ? <Rating /> : null}
                {props.screen == "difficulty" ? <Difficulty /> : null}
                {props.screen == "settings" ? <QuickStart /> : null}
                {props.screen == "suggestions" ? <Suggestions /> : null}
                {props.screen == "support" ? <Support /> : null}
                {props.screen == "controls0" ? <Controls player={0} /> : null}
                {props.screen == "controls1" ? <Controls player={1} /> : null}
            </div>
        </div>
    );
};

export default Screen;
