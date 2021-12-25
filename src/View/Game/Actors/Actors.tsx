import AutoDealer from "./AutoDealer";
import AutoSolver from "./AutoSolver";
import AutoUncoverer from "./AutoUncoverer";
import BoardNavigator from "../Navigation/BoardNavigator";
import Dealer from "./Dealer";
import FailDetector from "./FailDetector";
import React from "react";
import WinDetector from "./WinDetector";

const Actors = () => {
    return (
        <>
            <Dealer />
            <BoardNavigator />
            <AutoSolver />
            <WinDetector />
            <FailDetector />
            <AutoDealer />
            <AutoUncoverer />
        </>
    );
};

export default Actors;
