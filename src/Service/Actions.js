/**	
 * End Detection and Move Rating
 * Also, preparation for UNDO functionality?
 */
export default class Actions {

    constructor() {
        this.moves = [];
        this.currentMove = null;
    }

    registerMove(target, state, card) {
        var currentMove = {
            source: card.props.source,
            card: card.props,
            target: target
        }

        state.moves.push({ ...currentMove });
        state.points += this._rateMove(currentMove);
        return true;
    }

    registerRecycle(state) {
        state.moves.push({ source: 'waste', target: 'stock', card: null });
        state.points -= 100;
        console.debug('RATING: subtract 100 points for RECYCLE')
    }

    registerUncover(card, state) {
        state.moves.push({ source: null, target: null, card: card });
        state.points += 5;
        console.debug('RATING: add 5 points for UNCOVER')
    }

    _rateMove(move) {
        var sourceIsTableau = move.source.substr(0, 7) == 'tableau';
        var targetIsTableau = move.target.substr(0, 7) == 'tableau';
        console.log('is tableau', sourceIsTableau, targetIsTableau);
        if (sourceIsTableau) {
            if (move.target == 'foundation') {
                console.debug('RATING: add 10 points for MOVE tableau -> foundation')
                return 10;
            }
        } else if (move.source == 'waste') {
            if (move.target == 'foundation') {
                console.debug('RATING: add 10 points for MOVE waste -> foundation')
                return 10;
            }
            if (targetIsTableau) {
                console.debug('RATING: add 5 points for MOVE waste -> tableau')
                return 5;
            }
        } else if (move.source == 'foundation') {
            if (targetIsTableau) {
                console.debug('RATING: subtract 15 points for MOVE foundation -> tableau')
                return -15;
            }
        }

        return 0;
    }
} 