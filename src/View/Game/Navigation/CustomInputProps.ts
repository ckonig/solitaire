import Model from "../../../Model/Model";

type _void = () => void;
type _mod = (modifier: (state: Model) => void) => void;
export interface CustomInputProps {
    onLeft: _mod;
    onRight: _mod;
    onUp: _mod;
    onDown: _mod;
    onAction: _mod;
    onCancel: _mod;
    onHint: _mod;
    onUndo: _void;
    onPause: _mod;
    onMenu: _mod;
}
