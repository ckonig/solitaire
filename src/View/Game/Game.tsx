import AspectRatio from "../../common/AspectRatio/AspectRatio";
import BoardWrap from "./BoardWrap";
import Deck from "../../Model/Deck/Deck";
import DelayedSuspense from "../../common/DelayedSuspense";
import { GameContextProvider } from "../Context/GameContext";
import GameModes from "../../GameModes";
import { LaunchSettings } from "../../Common";
import { PauseProvider } from "../Context/PauseContext";
import Ratios from "../../common/AspectRatio/Ratios";
import React from "react";

interface GameProps {
    launchState: LaunchSettings;
    deck: Deck;
    restart: () => void;
}

const SinglePlayer = (props: GameProps) => {
    const { launchState, deck, restart } = props;
    return (
        <AspectRatio ratio={Ratios._4to3}>
            <div className={"layout-grid-container " + launchState.boardMode}>
                <BoardWrap player={0} settings={launchState} restart={restart} deck={deck} />
            </div>
        </AspectRatio>
    );
};

const SplitScreen = (props: GameProps) => {
    const { launchState, deck, restart } = props;
    const Wrap = (i: number) => (
        <div className={"layout-grid-container " + launchState.boardMode}>
            <BoardWrap player={i} settings={launchState} restart={restart} deck={deck.copy()} />
        </div>
    );

    return (
        <div className="game-layout-container splitscreen">
            {Wrap(0)}
            {Wrap(1)}
        </div>
    );
};

const Game = (props: GameProps) => {
    return (
        <GameContextProvider>
            <PauseProvider>
                <DelayedSuspense delay={500} fallback={<h3>Loading...</h3>}>
                    {props.launchState.boardMode === GameModes.SINGLEPLAYER && <SinglePlayer {...props} />}
                    {props.launchState.boardMode === GameModes.VERSUS && <SplitScreen {...props} />}
                </DelayedSuspense>
            </PauseProvider>
        </GameContextProvider>
    );
};

export default Game;
