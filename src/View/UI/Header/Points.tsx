import Icon from "@mdi/react";
import React from "react";
import { mdiTrophy } from "@mdi/js";
import { toast } from "react-toastify";
import useGlobalContext from "../../GlobalContext";

const Points = () => {
    const { state } = useGlobalContext();
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
                <span className="icon">
                    <Icon path={mdiTrophy} size=".9em" />
                </span>
            </button>
            {state?.game.rating.points}
        </div>
    );
};

export default Points;
