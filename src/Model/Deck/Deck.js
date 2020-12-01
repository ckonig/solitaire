export default class Deck {
    constructor(cards) {
        this.cards = cards;
    }

    shuffle() {
        this._shuffleArray(this.cards);
        return this;
    }

    take(i) {
        if (i) {
            var taken = this.cards.slice(0, i);
            this.cards = this.cards.slice(i);
            return taken;
        } else {
            var taken = [...this.cards];
            this.cards = [];
            return taken;
        }
    }

    // credits: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    _shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}