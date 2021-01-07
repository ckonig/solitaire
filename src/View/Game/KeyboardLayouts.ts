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

export const Arrows: KeyboardLayout = {
    up: (e: KeyboardEvent) => e.keyCode == 38,
    down: (e: KeyboardEvent) => e.keyCode == 40,
    right: (e: KeyboardEvent) => e.keyCode == 39,
    left: (e: KeyboardEvent) => e.keyCode == 37,
    cancel: (e: KeyboardEvent) => e.keyCode == 27,
    action: (e: KeyboardEvent) => e.keyCode == 96,
    undo: (e: KeyboardEvent) => e.keyCode == 90 && e.ctrlKey,
    hint: (e: KeyboardEvent) => e.keyCode == 72,
    pause: (e: KeyboardEvent) => e.keyCode == 80,
    menu: (e: KeyboardEvent) => e.keyCode == 77,
};
