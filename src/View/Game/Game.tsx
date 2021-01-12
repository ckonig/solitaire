import AspectRatio from "../../common/AspectRatio/AspectRatio";
import Deck from "../../Model/Deck/Deck";
import DelayedSuspense from "../../common/DelayedSuspense";
import GameModes from "../../GameModes";
import { LaunchSettings } from "../../Common";
import { PauseProvider } from "../PauseContext";
import Ratios from "../../common/AspectRatio/Ratios";
import React from "react";

const BoardWrap = React.lazy(() => import("./BoardWrap"));

interface GameProps {
    launchState: LaunchSettings;
    deck: Deck;
    restart: () => void;
}

const SinglePlayer = (props: GameProps) => {
    const { launchState, deck, restart } = props;
    return (
        <AspectRatio ratio={Ratios._4to3}>
            <div className={"layout-grid-container singleplayer"}>
                <BoardWrap player={0} settings={launchState} restart={restart} deck={deck} />
            </div>
        </AspectRatio>
    );
};

const SplitScreen = (props: GameProps) => {
    const { launchState, deck, restart } = props;
    return (
        <div className="game-layout-container splitscreen">
            <div className={"layout-grid-container " + launchState.boardMode}>
                <BoardWrap
                    player={0}
                    settings={{ ...launchState, inputMode: launchState.players[0].inputMethod }}
                    restart={restart}
                    deck={deck.copy()}
                />
            </div>

            <div className={"layout-grid-container " + launchState.boardMode}>
                <BoardWrap
                    player={1}
                    settings={{ ...launchState, inputMode: launchState.players[1].inputMethod }}
                    restart={restart}
                    deck={deck.copy()}
                />
            </div>
        </div>
    );
};

const Game = (props: GameProps) => {
    const [started, setStarted] = React.useState<number>(0);
    React.useEffect(() => setStarted(Date.now()), []);
    return (
        <PauseProvider started={started}>
            <DelayedSuspense delay={500} fallback={<h3>Loading...</h3>}>
                {props.launchState.boardMode == GameModes.SINGLEPLAYER && <SinglePlayer {...props} />}
                {props.launchState.boardMode == GameModes.VERSUS && <SplitScreen {...props} />}
            </DelayedSuspense>
        </PauseProvider>
    );
};

export default Game;
