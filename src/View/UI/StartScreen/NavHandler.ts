import { XY } from "./Menu/Tree";

export interface NavHandler {
    moveUp: (x: number, y: number) => XY;
    moveDown: (x: number, y: number) => XY;
    moveLeft: (x: number, y: number) => XY;
    moveRight: (x: number, y: number) => XY;
    action: (xy: XY) => void;
}