import EntropyLevels from "../../../../Model/Game/EntropyLevels";
import React from "react";
import StartScreenContext, { NavigationContext, StartScreenState } from "../Context";
import ScreenSelect from "./ScreenSelect";
import ScreenToggle from "./ScreenToggle";
import CookieBanner from "./CookieBanner";
import ScreenMainButton from "./ScreenMainButton";
import ScreenContent from "./ScreenContent";
import Row from "./Row";
import { CookieContext } from "../../../Context";

interface OptimizeOption {
    entropy: number;
    quickDeal: boolean;
    lines: string[];
    icon: string;
}

const optimizeOptions: (state: StartScreenState) => OptimizeOption[] = (state: StartScreenState) => [
    {
        entropy: 2,
        quickDeal: false,
        lines: [(!state.quickDeal ? "Optimized" : "Optimize") + " for Desktop"],
        icon: "🖥️",
    },
    {
        entropy: 1,
        quickDeal: true,
        lines: [(state.quickDeal ? "Optimized" : "Optimize") + " for Mobile"],
        icon: "📱",
    },
];

const QuickStart = (props: { closeScreen: () => void }) => {
    const { state, setState } = React.useContext(StartScreenContext);
    const { navigation } = React.useContext(NavigationContext);
    const isActive = (val: boolean) => state.quickDeal == val;

    const setBaseEntropy = (value: string) =>
        setState({ ...state, entropySettings: { ...state.entropySettings, baseEntropy: parseInt(value) } });

    const setInteractionEntropy = (value: string) =>
        setState({ ...state, entropySettings: { ...state.entropySettings, interactionEntropy: parseInt(value) } });

    const setQuickDeal = (value: boolean) => {
        setState({ ...state, quickDeal: value });
    };

    const getClassName = (button: OptimizeOption, y: number, x: number) => {
        const hasFocus = navigation.screen.x == x && navigation.screen.y == y;
        let name = isActive(button.quickDeal) ? "active active-0" : "inactive-0";
        name += hasFocus ? " focused" : "";
        return name;
    };

    const { consented } = React.useContext(CookieContext);

    return (
        <div className="quickstart startdetails">
            <div className="closer">
                <button onClick={props.closeScreen}>🗙</button>
            </div>
            <div className="title">Various</div>
            <ScreenContent id="settings">
                <Row skip={consented}>
                    <CookieBanner />
                </Row>
                <Row>
                    {optimizeOptions(state).map((button, i) => (
                        <ScreenMainButton
                            key={i}
                            icon={button.icon}
                            id={i}
                            initialFocus={isActive(button.quickDeal)}
                            className={(pos) => getClassName(button, pos.x, pos.y)}
                            lines={button.lines}
                            onClick={() =>
                                setState({
                                    ...state,
                                    quickDeal: button.quickDeal,
                                    entropySettings: {
                                        baseEntropy: button.entropy,
                                        interactionEntropy: button.entropy,
                                    },
                                })
                            }
                        />
                    ))}
                </Row>
                <Row>
                    <ScreenSelect
                        label="Base Entropy"
                        description="How much chaos will the stacks on the board contain by themselves?"
                        value={state.entropySettings.baseEntropy || 0}
                        values={EntropyLevels.map((label, id) => ({ id, label }))}
                        callBack={setBaseEntropy}
                    />
                    <ScreenSelect
                        label="Interaction Entropy"
                        description="How much chaos will each interaction add to a stack on the board?"
                        value={state.entropySettings.interactionEntropy || 0}
                        values={EntropyLevels.map((label, id) => ({ id, label }))}
                        callBack={setInteractionEntropy}
                    />
                </Row>
                <Row>
                    <ScreenToggle
                        label="Instant Deal"
                        description="Should the deal animation at the beginning of the game be skipped?"
                        value={state.quickDeal}
                        callBack={setQuickDeal}
                    />
                    <ScreenToggle
                        disabled={true}
                        label="Auto Deal"
                        description="Should the game draw one card from the stock every 5 seconds?"
                        value={false}
                        callBack={() => {}}
                    />
                </Row>
            </ScreenContent>
        </div>
    );
};
export default QuickStart;
