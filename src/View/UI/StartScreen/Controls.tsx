import React from "react";

const Controls = (props: { head: string }) => {
    return (
        <div className="controls startdetails">
            <div className="title">{props.head}</div>
            <div className="title">Controls</div>
            <div className="content center">
                <div className="left">
                    <div className="title">Player 1</div>
                </div>
                <div className="right">
                    <div className="title">Player 2</div>
                </div>
            </div>
        </div>
    );
};

export default Controls;
