import Clock from './Clock';

export default function Footer(props) {
    return (
        <div className="footer">
            Points: {props.model.points}
            <br />
            <Clock started={props.model.started} end={props.model.end} />
            <br />
            Is Ended: { props.model.isEnded ? "Y" : "N"}
            <br />
            <button onClick={props.reset}>reset</button>
            <br />
            Report Issues <a href="https://github.com/ckonig/solitaire/issues">here</a>.
        </div>
    );
}