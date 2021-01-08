import GlobalContext from "../../Context";
import React from "react";

const Points = () => {
    const { state } = React.useContext(GlobalContext);

    return (
        <>
            <div className="icon-container">🏆</div> {state?.game.rating.points}
        </>
    );
};

export default Points;
