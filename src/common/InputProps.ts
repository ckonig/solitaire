export interface InputProps {
    onLeft?: () => void;
    onRight?: () => void;
    onUp?: () => void;
    onDown?: () => void;
    onAction?: () => void;
    onCancel?: () => void;
    onHint?: () => void;
    onUndo?: () => void;
    onPause?: () => void;
    onMenu?: () => void;
}
