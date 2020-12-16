import React from "react";

const Clock = (props) => {
    const [elapsed, setElapsed] = React.useState(0);
    React.useEffect(() => {
        const interval = setInterval(() => {
            if (props.game.started) {
                setElapsed(props.game.getElapsed());
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return !props.started || !elapsed ? null : (
        <div className={props.className}>
            <div className="icon-container">🕒</div>
            {elapsed}
        </div>
    );
};

export default Clock;
