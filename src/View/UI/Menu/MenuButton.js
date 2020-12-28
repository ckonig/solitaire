import React from "react";

const MenuButton = (props) => {
    const inputEl = React.useRef(null);

    let className = "";
  
    if (props.y > 0) {
        className += " indented";
    }

    const shouldBeFocus = props.menuX == props.x && props.menuY == props.y && props.menuFocus == "menu";

    if (shouldBeFocus) {
        className += " highlight";
    }

    React.useEffect(() => {
        if (
            props.menuX == props.x &&
            props.menuY == props.y &&
            props.menuFocus == "menu" &&
            inputEl.current &&
            inputEl.current !== document.activeElement
        ) {
            setClicking(true);
            inputEl && inputEl.current && inputEl.current.focus();
        }
    }, [props.menuFocus, props.menuX, props.menuY, props.x, props.y]);

    if (props.active) {
        className += " active";
    }

    //omg this is the worst but it works (5h lost)
    const [isClicking, setClicking] = React.useState(false);

    const focus = () => {
        if (!isClicking && !(props.menuX == props.x && props.menuY == props.y) && props.menuFocus == "menu") {
            props.onFocus({ x: props.x, y: props.y });
            setClicking(false);
        }
    };

    const click = () => {
        setClicking(false);
        props.onClick({ x: props.x, y: props.y });
    };

    return (
        <button ref={inputEl} className={className} title={props.title} onFocus={focus} onClick={click} onMouseDown={()=>setClicking(true)}>
            <div className="icon">{props.icon}</div>
            <div className="label">{props.title}</div>
        </button>
    );
};
export default MenuButton;
