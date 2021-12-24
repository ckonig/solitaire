import CloseButton from "../Common/CloseButton";
import CookieBanner from "../Common/CookieBanner";
import EntropyLevels from "../../../../Model/Game/Settings/EntropyLevels";
import React from "react";
import Row from "../Navigation/Row";
import ScreenContent from "../Navigation/ScreenContent";
import ScreenSelect from "../Common/ScreenSelect";
import useCookieContext from "../../CookieContext";
import useStartScreenContext from "../StartScreenContext";

const QuickStart = () => {
    const { state, setState } = useStartScreenContext();
    const { consented } = useCookieContext();

    const setBaseEntropy = (value: string) =>
        setState({ ...state, entropySettings: { ...state.entropySettings, baseEntropy: parseInt(value) } });

    const setInteractionEntropy = (value: string) =>
        setState({ ...state, entropySettings: { ...state.entropySettings, interactionEntropy: parseInt(value) } });

    return (
        <div className="quickstart startdetails">
            <CloseButton />
            <div className="title">Entropy</div>
            <ScreenContent id="settings">
                <Row skip={consented}>
                    <CookieBanner />
                </Row>

                <Row>
                    <ScreenSelect
                        label="Base Entropy"
                        description="How much chaos will the stacks on the board contain by themselves?"
                        value={state.entropySettings.baseEntropy || 0}
                        values={EntropyLevels.map((label, id) => ({ id, label }))}
                        callBack={setBaseEntropy}
                        autoFocus={true}
                    />
                    <ScreenSelect
                        label="Interaction Entropy"
                        description="How much chaos will each interaction add to a stack on the board?"
                        value={state.entropySettings.interactionEntropy || 0}
                        values={EntropyLevels.map((label, id) => ({ id, label }))}
                        callBack={setInteractionEntropy}
                    />
                </Row>
            </ScreenContent>
        </div>
    );
};
export default QuickStart;
