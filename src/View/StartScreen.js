import React from "react";

const StartScreen = (props) => {
    //@todo make this an optional part of the menu
    //@todo add selectors for draw mode & recycling options
    //@todo add selector for timed game
    //@todo add and implement custom start button
    //@todo implement quick-start buttons for different game modes
    return props && props.game && (props.game.started || props.game.shouldStart) ? null : (
        <div className="startScreen">
            <div>
                <div className="title">Quickstart</div>
                <div className="left">
                    <button onClick={props.start}>
                        🐭
                        <div>Turn 1 card at once</div>
                        <div>no limit on passes</div>
                        <div> through the deck</div>
                    </button>
                    <button onClick={props.start}>
                        🐹
                        <div>Turn 1 card at once</div>
                        <div>three passes</div>
                        <div>through the deck</div>
                    </button>
                    <button onClick={props.start}>
                        🐰
                        <div>Turn 1 card at once</div>
                        <div>only a single pass</div>
                        <div>through the deck</div>
                    </button>
                </div>
                <div className="right">
                    <button onClick={props.start}>
                        🐨
                        <div>Turn 3 cards at once</div>
                        <div>no limit on passes</div>
                        <div> through the deck</div>
                    </button>
                    <button onClick={props.start}>
                        🐼
                        <div>Turn 3 cards at once</div>
                        <div>three passes</div>
                        <div>through the deck</div>
                    </button>
                    <button onClick={props.start}>
                        🐻
                        <div>Turn 3 cards at once</div>
                        <div>only a single pass</div>
                        <div>through the deck</div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StartScreen;
