const Deck = require('../assets/Deck');

module.exports = {
    name: 'blackjack',
    aliases: ['bj'],
    desc: 'Play TG-16 in blackjack',
    syntax: 'bj <[start \\|\\| hit \\|\\| stand \\|\\| cards \\|\\| leave]>',
    execute(msg, args, client) {
        if(!client.data.hasOwnProperty('bj'))
            client.data.bj = {}

        if(!args[0] || !["start", "hit", "stand", "cards", "leave"].includes(args[0]))
            return msg.reply(`the syntax is: ${this.syntax}`);

        let game;
        let deck = new Deck();

        function getCardSums(cards) {
            let sum = 0;
            let aces = 0;

            cards = cards.map(c => c.slice(0, -2));

            cards.forEach(value => {
                if(["J", "Q", "K"].includes(value))
                    value = 10;
                else if(value == "A") {
                    value = 11;
                    aces++;
                }

                sum += Number(value);
            });

            for (let _ = 0; _ < aces; _++)
                if (sum > 21 && aces > 0)
                    sum -= 10;

            return sum;
        }

        if(args[0] == 'start' && !client.data.bj.hasOwnProperty(msg.member.user.id)) {
            game = {"deck": deck.cards, "user": [], "bot": []};

            game.user.push(deck.draw());
            game.bot.push(deck.draw());
            game.user.push(deck.draw());
            game.bot.push(deck.draw());

            if (getCardSums(game.bot) == 21)
                return msg.reply(`you lose! TG-16 got a blackjack!\n\nYour cards: \`${game.user.join(", ")}\`\nTG-16 cards: \`${game.bot.join(", ")}\``);
            else if (getCardSums(game.user) == 21)
                return msg.reply(`blackjack! You win!\n\nYour cards: \`${game.user.join(", ")}\`\nTG-16 cards: \`${game.bot.join(", ")}\``);

            client.data.bj[msg.member.user.id] = {"deck": game.deck, "user": game.user, "bot": game.bot};
            return msg.reply(`your cards: \`${game.user.join(", ")}\``);
        }
        else if(args[0] == "start")
            return msg.reply("you have a game in progress. To abandon it: \`bj leave\`.");

        if((args[0] == "hit" || args[0] == "stand" || args[0] == "cards") && client.data.bj.hasOwnProperty(msg.member.user.id)) {
            game = client.data.bj[msg.member.user.id];
            deck.loadDeck(game.deck);
        }
        else if(args[0] == "hit" || args[0] == "stand" || args[0] == "cards")
            return msg.reply("you don't have a game in progress. Start one with: \`bj start\`.");

        if(args[0] == "leave" && client.data.bj.hasOwnProperty(msg.member.user.id)) {
            delete client.data.bj[msg.member.user.id];
            return msg.reply("game abandoned!");
        }
        else if(args[0] == "leave")
            return msg.reply("you have no game to leave!")

        if (args[0] == "cards")
            return msg.reply(`your cards: \`${game.user.join(", ")}\``);

        if(args[0] == "hit") {
            game.user.push(deck.draw());
            
            delete client.data.bj[msg.member.user.id];
            
            if(getCardSums(game.user) == 21)
                return msg.reply(`blackjack! You win!\n\nYour cards: \`${game.user.join(", ")}\`\nTG-16 cards: \`${game.bot.join(", ")}\``);
            else if(getCardSums(game.user) > 21)
                return msg.reply(`you lose!\n\nYour cards: \`${game.user.join(", ")}\`\nTG-16 cards: \`${game.bot.join(", ")}\``);

            client.data.bj[msg.member.user.id] = {"deck": game.deck, "user": game.user, "bot": game.bot};
            return msg.reply(`your cards: \`${game.user.join(", ")}\``);
        }

        if(args[0] == "stand") {
            delete client.data.bj[msg.member.user.id];

            while (true) {
                botSum = getCardSums(game.bot);

                if(botSum <= 16) {
                    game.bot.push(deck.draw());
                    continue;
                }
                else if(botSum > 21)
                    return msg.reply(`you win!\n\nYour cards: \`${game.user.join(", ")}\`\nTG-16 cards: \`${game.bot.join(", ")}\``);
                else if(botSum == 21)
                    return msg.reply(`you lose! TG-16 got a blackjack!\n\nYour cards: \`${game.user.join(", ")}\`\nTG-16 cards: \`${game.bot.join(", ")}\``); 
                else if(16 < botSum < 21) {
                    userSum = getCardSums(game.user);
                    
                    if(botSum >= userSum)
                        return msg.reply(`you lose!\n\nYour cards: \`${game.user.join(", ")}\`\nTG-16 cards: \`${game.bot.join(", ")}\``);
                    else
                        return msg.reply(`you win!\n\nYour cards: \`${game.user.join(", ")}\`\nTG-16 cards: \`${game.bot.join(", ")}\``);
                }
            }
        }
    }
}
