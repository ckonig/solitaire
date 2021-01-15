interface KeyboardLayout {
    up: (e: KeyboardEvent) => boolean;
    down: (e: KeyboardEvent) => boolean;
    right: (e: KeyboardEvent) => boolean;
    left: (e: KeyboardEvent) => boolean;
    cancel: (e: KeyboardEvent) => boolean;
    action: (e: KeyboardEvent) => boolean;
    undo: (e: KeyboardEvent) => boolean;
    hint: (e: KeyboardEvent) => boolean;
    pause: (e: KeyboardEvent) => boolean;
    menu: (e: KeyboardEvent) => boolean;
}

export default KeyboardLayout;

export const getKeyboardLayout = (id: number) => {
    if (id == 0) return Wasd;
    if (id == 1) return Arrows;
    if (id == 2) return NumPad;
    throw new Error("Unknown keyboard layout ID");
};

export const Arrows: KeyboardLayout = {
    up: (e) => e.keyCode == 38,
    down: (e) => e.keyCode == 40,
    right: (e) => e.keyCode == 39,
    left: (e) => e.keyCode == 37,
    cancel: (e) => e.keyCode == 27,
    action: (e) => e.keyCode == 96,
    undo: (e) => e.keyCode == 90 && e.ctrlKey,
    hint: (e) => e.keyCode == 72,
    pause: (e) => e.keyCode == 80,
    menu: (e) => e.keyCode == 77,
};

export const Wasd: KeyboardLayout = {
    up: (e) => e.keyCode == 87,
    down: (e) => e.keyCode == 83,
    right: (e) => e.keyCode == 68,
    left: (e) => e.keyCode == 65,
    cancel: (e) => e.keyCode == 69,
    action: (e) => e.keyCode == 81,
    undo: (e) => e.keyCode == 88,
    hint: (e) => e.keyCode == 90,
    pause: (e) => e.keyCode == 999,
    menu: (e) => e.keyCode == 27,
};

export const NumPad: KeyboardLayout = {
    up: (e) => e.keyCode == 104,
    down: (e) => e.keyCode == 101,
    right: (e) => e.keyCode == 102,
    left: (e) => e.keyCode == 100,
    cancel: (e) => e.keyCode == 105,
    action: (e) => e.keyCode == 103,
    undo: (e) => e.keyCode == 98,
    hint: (e) => e.keyCode == 97,
    pause: (e) => e.keyCode == 999,
    menu: (e) => e.keyCode == 99,
};

export const Universal: KeyboardLayout = {
    up: (e) => NumPad.up(e) || Wasd.up(e) || Arrows.up(e),
    down: (e) => NumPad.down(e) || Wasd.down(e) || Arrows.down(e),
    right: (e) => NumPad.right(e) || Wasd.right(e) || Arrows.right(e),
    left: (e) => NumPad.left(e) || Wasd.left(e) || Arrows.left(e),
    cancel: (e) => NumPad.cancel(e) || Wasd.cancel(e) || Arrows.cancel(e),
    action: (e) => NumPad.action(e) || Wasd.action(e) || Arrows.action(e),
    undo: (e) => NumPad.undo(e) || Wasd.undo(e) || Arrows.undo(e),
    hint: (e) => NumPad.hint(e) || Wasd.hint(e) || Arrows.hint(e),
    pause: (e) => NumPad.pause(e) || Wasd.pause(e) || Arrows.pause(e),
    menu: (e) => NumPad.menu(e) || Wasd.menu(e) || Arrows.menu(e),
};
