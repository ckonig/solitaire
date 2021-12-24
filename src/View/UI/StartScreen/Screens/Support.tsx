import CloseButton from "../Common/CloseButton";
import CookieBanner from "../Common/CookieBanner";
import React from "react";
import Row from "../Navigation/Row";
import ScreenContent from "../Navigation/ScreenContent";
import ScreenToggle from "../Common/ScreenToggle";
import useCookieContext from "../../CookieContext";
import useStartScreenContext from "../StartScreenContext";

const Support = () => {
    const { state, setState } = useStartScreenContext();
    const { consented } = useCookieContext();
    const setAutoResolve = (val: boolean) => setState({ ...state, autoResolve: val });
    const setQuickDeal = (value: boolean) => setState({ ...state, quickDeal: value });
    const setAutoUncover = (value: boolean) => setState({ ...state, autoUncover: value });
    const setSpeed = (value: boolean) => setState({ ...state, speed: value });
    return (
        <div className="quickstart startdetails">
            <CloseButton />
            <div className="title">Support</div>
            <ScreenContent id="support">
                <Row skip={consented}>
                    <CookieBanner />
                </Row>
                <Row>
                    <ScreenToggle
                    icon={""}
                        label="Auto Resolve"
                        description="Enable this to automatically resolve the board once all cards are uncovered and moved to the tableau."
                        value={state.autoResolve}
                        callBack={setAutoResolve}
                        autoFocus={true}
                    />
                    <ScreenToggle
                    icon={""}
                        label="Auto Uncover"
                        description="Should the game automatically uncover cards for you?"
                        value={state.autoUncover}
                        callBack={setAutoUncover}
                    />
                </Row>
                <Row>
                    <ScreenToggle
                    icon={""}
                        label="Instant Deal"
                        description="Should the deal animation at the beginning of the game be skipped?"
                        value={state.quickDeal}
                        callBack={setQuickDeal}
                    />
                    <ScreenToggle
                    icon={""}
                        label="Auto Draw"
                        description="Should the game automatically draw from the stock every 10 seconds?"
                        value={state.speed}
                        callBack={setSpeed}
                    />
                </Row>
            </ScreenContent>
        </div>
    );
};
export default Support;
