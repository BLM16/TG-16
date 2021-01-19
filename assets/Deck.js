module.exports = class Deck {
    constructor() {
        this.cards = ["A♣️", "A♠️", "A♦️", "A♥️", "2♣️", "2♠️", "2♦️", "2♥️", "3♣️", "3♠️", "3♦️", "3♥️", "4♣️", "4♠️", "4♦️", "4♥️", "5♣️", "5♠️", "5♦️", "5♥️", "6♣️", "6♠️", "6♦️", "6♥️", "7♣️", "7♠️", "7♦️", "7♥️", "8♣️", "8♠️", "8♦️", "8♥️", "9♣️", "9♠️", "9♦️", "9♥️", "10♣️", "10♠️", "10♦️", "10♥️", "J♣️", "J♠️", "J♦️", "J♥️", "Q♣️", "Q♠️", "Q♦️", "Q♥️", "K♣️", "K♠️", "K♦️", "K♥️"]
    }

    draw() {
        const card = this.cards[Math.floor(Math.random() * this.cards.length)];
        this.cards.splice(this.cards.indexOf(card), 1);
        return card;
    }

    loadDeck(cards) { this.cards = cards; }
}
