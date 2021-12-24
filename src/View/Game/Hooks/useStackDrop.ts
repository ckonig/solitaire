import { IStack } from "../../../Model/Game/Stack";
import { useDrop } from "react-dnd";
import useGlobalContext from "../../GlobalContext";

export const useStackDrop = (model: IStack, accepts?: (c: any) => boolean) => {
    const { updateGameContext } = useGlobalContext();
    return useDrop({
        accept: "card",
        canDrop: (item: any) => {
            return (accepts && accepts(item.model)) || model.accepts(item.model);
        },
        drop: () => {
            updateGameContext(model.clickEmpty({ isKeyBoard: false }));
        },
    })[1];
};
