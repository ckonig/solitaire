import React from "react";
import { TreeNavigator } from "./TreeNavigator";
import { XY } from "../../XY";
import useNavigationContext from "../NavigationContext";

interface _MenuButtonProps extends StaticMenuButtonProps {
    x?: number;
    y?: number;
    navigator?: TreeNavigator;
}

export interface StaticMenuButtonProps {
    icon: string;
    title: string;
    onClick: (pos: XY) => void;
    toggled?: boolean;
    children?: any[];
    disabled?: boolean;
    skip?: boolean;
}
interface MenuButtonProps extends StaticMenuButtonProps {
    x: number;
    y: number;
    menuX: number;
    menuY: number;
    menuFocus: string;
    active: boolean;
    toggled: boolean;
    onFocus: (pos: XY) => void;
}
const MenuButton = (props: _MenuButtonProps) => {
    if (typeof props.x === "undefined" || typeof props.y === "undefined") {
        return null;
    }

    const { navigation, setNavigation } = useNavigationContext();

    const onFocus = (pos: XY) => setNavigation({ ...navigation, menu: pos });

    const addItem = (child: any, index: number) => {
        const assign = (n: any[]) => {
            n[props.x || 0].buttons[index + 1] = { ...props, x: props.x, y: index + 1 };
        };
        assign(props.navigator?.rows || []);

        return React.cloneElement(child, { key: index, x: props.x, y: index + 1, navigator: props.navigator });
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
            disabled={props.disabled}
            active={false}
            onFocus={onFocus}
            onClick={props.onClick}
            toggled={!!props.toggled}
            skip={props.skip}
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

    const shouldBeFocus = props.menuX === props.x && props.menuY === props.y && props.menuFocus === "menu";

    if (shouldBeFocus && !props.skip) {
        className += " highlight";
    }

    React.useEffect(() => {
        if (
            props.menuX === props.x &&
            props.menuY === props.y &&
            props.menuFocus === "menu" &&
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
        if (!isClicking && !(props.menuX === props.x && props.menuY === props.y) && props.menuFocus === "menu") {
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
                disabled={props.skip}
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
