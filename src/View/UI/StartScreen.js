import "../../Style/Screens.css";

import React from "react";

const StartScreen = (props) => {
    //@todo add selector for timed game
    //@todo add selectors for different rating strategies
    //@todo add and implement custom start button + selectors for draw mode & recycling options
    return !props || !props.start ? null : (
        <div>
            <div className="quickstart">
                <div>
                    <div className="title">Quickstart</div>
                    <div className="left">
                        <button onClick={() => props.start({ drawMode: "single", recyclingMode: "infinite" })}>
                            🐭
                            <div>Turn 1 card at once.</div>
                            <div>No limit on passes</div>
                            <div>through the deck.</div>
                        </button>
                        <button onClick={() => props.start({ drawMode: "single", recyclingMode: "3-pass" })}>
                            🐹
                            <div>Turn 1 card at once.</div>
                            <div>Three passes</div>
                            <div>through the deck.</div>
                        </button>
                        <button onClick={() => props.start({ drawMode: "single", recyclingMode: "1-pass" })}>
                            🐰
                            <div>Turn 1 card at once.</div>
                            <div>Only a single pass</div>
                            <div>through the deck.</div>
                        </button>
                    </div>
                    <div className="right">
                        <button onClick={() => props.start({ drawMode: "triple", recyclingMode: "infinite" })}>
                            🐨
                            <div>Turn 3 cards at once.</div>
                            <div>No limit on passes</div>
                            <div>through the deck.</div>
                        </button>
                        <button onClick={() => props.start({ drawMode: "triple", recyclingMode: "3-pass" })}>
                            🐼
                            <div>Turn 3 cards at once.</div>
                            <div>Three passes</div>
                            <div>through the deck.</div>
                        </button>
                        <button onClick={() => props.start({ drawMode: "triple", recyclingMode: "1-pass" })}>
                            🐻
                            <div>Turn 3 cards at once.</div>
                            <div>Only a single pass</div>
                            <div>through the deck.</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StartScreen;
