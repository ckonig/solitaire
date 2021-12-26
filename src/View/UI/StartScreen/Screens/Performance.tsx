import CloseButton from "../Common/CloseButton";
import CookieBanner from "../Common/CookieBanner";
import React from "react";
import Row from "../Navigation/Row";
import ScreenContent from "../Navigation/ScreenContent";
import ScreenToggle from "../Common/ScreenToggle";
import useCookieContext from "../../CookieContext";
import useStartScreenContext from "../StartScreenContext";

const Performance = () => {
    const { state, setState } = useStartScreenContext();
    const { consented } = useCookieContext();
    const setConfettiFs = (value: boolean) => setState({ ...state, featureSwitches: { ...state.featureSwitches, confetti: value } });
    const setUndoFs = (value: boolean) => setState({ ...state, featureSwitches: { ...state.featureSwitches, undo: value } });
    return (
        <div className="performance startdetails">
            <CloseButton />
            <div className="title">Performance</div>
            <ScreenContent id="performance">
                <Row skip={consented}>
                    <CookieBanner />
                </Row>
                <Row>
                    <ScreenToggle
                        icon={""}
                        label="Undo Feature Switch"
                        description="Undo is an expensive feature and can be switched off for performance reasons."
                        value={!!state.featureSwitches.undo}
                        callBack={setUndoFs}
                    />
                    <ScreenToggle
                        icon={""}
                        label="Confetti Feature Switch"
                        description="Undo is an expensive feature and can be switched off for performance or concentration reasons."
                        value={!!state.featureSwitches.confetti}
                        callBack={setConfettiFs}
                    />
                </Row>
                <Row></Row>
            </ScreenContent>
        </div>
    );
};

export default Performance;
