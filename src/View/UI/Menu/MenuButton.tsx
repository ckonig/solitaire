import React from "react";
import { NavigationContext } from "../StartScreen/Context";
import { XY } from "../StartScreen/Menu/Tree";
import { TreeNavigator } from "../StartScreen/TreeNavigator";

interface _MenuButtonProps extends StaticMenuButtonProps {
    //@todo keyboard navigation in a tree
    x?: number;
    y?: number;
    navigator?: TreeNavigator;
}

export interface StaticMenuButtonProps {
    icon: string;
    title: string;
    onClick: (pos: XY) => void;
    onFocus: (pos: XY) => void;
    toggled?: boolean;
    children?: any[];
}
interface MenuButtonProps extends StaticMenuButtonProps {
    x: number;
    y: number;
    menuX: number;
    menuY: number;
    menuFocus: string;
    active: boolean;
    toggled: boolean;
}
const MenuButton = (props: _MenuButtonProps) => {
    if (typeof props.x == "undefined" || typeof props.y == "undefined") {
        return null;
    }

    const { navigation } = React.useContext(NavigationContext);

    const addItem = (child: any, index: number) => {
        const assign = (n: any[]) => {
            n[props.x || 0].buttons[index + 1] = { ...props };
        };
        assign(props.navigator?.rows || []);
        return React.cloneElement(child, { x: props.x, y: index + 1, navigator: props.navigator });
    };

    return (
        <_MenuButton
            title={props.title}
            x={props.x || 0}
            y={props.y || 0}
            icon={props.icon}
            menuX={navigation.menu.x}
            menuY={navigation.menu.y}
            menuFocus={navigation.focus}
            active={false}
            onFocus={props.onFocus}
            onClick={props.onClick}
            toggled={!!props.toggled}
        >
            {props.children?.map(addItem)}
        </_MenuButton>
    );
};
const _MenuButton = (props: MenuButtonProps) => {
    const inputEl = React.useRef<HTMLButtonElement>(null);

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
        <>
            <button
                ref={inputEl}
                className={className}
                title={props.title}
                onFocus={focus}
                onClick={click}
                onMouseDown={() => setClicking(true)}
            >
                <div className="icon">{props.icon}</div>
                <div className="label">{props.title}</div>
            </button>
            <div>{!props.toggled ? null : props.children}</div>
        </>
    );
};
export default MenuButton;
