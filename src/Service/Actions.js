/**	
 * End Detection and Move Rating
 * Also, preparation for UNDO functionality?
 */
export default class Actions {

    constructor(stateHolder) {
        this.moves = [];
        this.currentMove = null;
        this.stateHolder = stateHolder;
    }

    startMove(source, card, state) {
        if (state.currentMove == null) {
            state.currentMove = {
                source,
                card: card.props,
                target: null
            }
        }
    }

    endMove(target, state) {
        if (state.currentMove) {
            state.currentMove.target = target;
            state.moves.push({ ...state.currentMove });
            state.points += this._rateMove(state.currentMove);
            this._printMove(state.currentMove)
            state.currentMove = null;
            this._tryDetectEnd(state)
        }
    }

    _tryDetectEnd(state) {
        var reduced = this.stateHolder.state.foundation.stacks.map(f => parseInt(f.stack.length)).reduce((a, b) => a + b, 0);
        if (reduced == 52) {
            state.isEnded = true;
            state.end = Date.now();
        }
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
        return { ...state }
    }

    _printMove(move) {
        console.log('Successfully moved ' + move.card.type.icon + '' + move.card.face + ' from ' + move.source + ' to ' + move.target);
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