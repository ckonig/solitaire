import Clock from './Clock';

export default function Footer(props) {
    return (
        <div>
            Points: {props.points}
            <br />
            <Clock started={props.started} end={props.end} />
            <br />
            Is Ended: { props.isEnded ? "Y" : "N"}
        </div>
    );
}