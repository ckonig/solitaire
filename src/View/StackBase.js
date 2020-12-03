export default function StackBase(props) {
    var classname = "card-base socket-empty"
    if (props.blink) {
        classname += " blink"
    }
    return (
        <div className={classname} onClick={() => props.onClick()}>{props.children}</div>
    )
}