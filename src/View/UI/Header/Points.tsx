import GlobalContext from "../../Context";
import React from "react";
import { toast } from "react-toastify";

const Points = () => {
    const { state } = React.useContext(GlobalContext);
    if (!state) return null;
    const showToast = () => {
        toast.info(
            <ul>
                {state.game.rating.ratings.reverse().map((rating, index) => (
                    <li key={index}>
                        {rating.points} - {rating.text}
                    </li>
                ))}
            </ul>,
            { autoClose: false }
        );
    };
    return (
        <div>
            <button title="Points" onClick={showToast}>
                <span className="icon">🏆</span>
            </button>
            {state?.game.rating.points}
        </div>
    );
};

export default Points;
