export default class Game {
    constructor() {
        this.moves = [];
        this.currentMove = null;
        this.points = 0;
        this.started = Date.now();
    }

    registerMove(target, card) {
        var currentMove = {
            source: card.source,
            card: card,
            target: target
        }

        this.points += this._rateMove(currentMove);
        this.moves.push({ ...currentMove });
        this.points += this._rateMove(currentMove);
        return true;
    }

    registerRecycle() {
        this.moves.push({ source: 'waste', target: 'stock', card: null });
        this.points -= 100;
        if (this.points < 0) {
            this.points = 0;
        }
        console.debug('RATING: subtract 100 points for RECYCLE')
    }

    registerUncover(card) {
        this.moves.push({ source: null, target: null, card: card });
        this.points += 5;
        console.debug('RATING: add 5 points for UNCOVER')
    }

    _rateMove(move) {
        var sourceIsTableau = move.source.substr(0, 7) == 'tableau';
        var targetIsTableau = move.target.substr(0, 7) == 'tableau';
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