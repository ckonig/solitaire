import React from "react";

const Undo = (props) => {
    const ctrlZ = (e) => {
        const evtobj = window.event ? event : e;
        if (evtobj.keyCode == 90 && evtobj.ctrlKey) {
            props.undo();
        }
    };

    React.useEffect(() => {
        document.addEventListener("keydown", ctrlZ);
        return () => document.removeEventListener("keydown", ctrlZ);
    });

    return (
        <div>
            <button
                disabled={!props.game.previousStates.length}
                title={"Undo (Penalty:" + Math.pow(2, props.game.multiplicator) + ")"}
                onClick={props.undo}
            >
                ⏪
            </button>
        </div>
    );
};

export default Undo;
