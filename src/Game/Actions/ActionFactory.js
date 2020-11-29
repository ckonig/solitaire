class ActionFactory {
    createAction(cards, from, to) {
        
    }
}

export const createAction = (cards, from, to) => new ActionFactory().createAction(cards, from, to);