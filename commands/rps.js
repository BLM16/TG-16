module.exports = {
    name: 'rps',
    desc: 'Rock paper scissors against TG-16',
    syntax: 'rps <[rock \\|\\| paper \\|\\| scissors]>',
    execute(msg, args, client) {
        const choices = ['r', 'p', 's', 'rock', 'paper', 'scissors'];

        if(!args[0] || !choices.includes(args[0]))
            return msg.reply('that isn\'t a valid choice!');

        let userChoice = args[0][0];
        let botChoice = choices[Math.floor(Math.random() * choices.length)][0]

        switch(userChoice) {
            case 'r':
                switch(botChoice) {
                    case 'r':
                        return msg.reply('tied!');
                    case 'p':
                        return msg.reply('lost!');
                    case 's':
                        return msg.reply('won!');
                }
            case 'p':
                switch(botChoice) {
                    case 'r':
                        return msg.reply('won!');
                    case 'p':
                        return msg.reply("tied!");
                    case 's':
                        return msg.reply("lost!");
                }
            case 's':
                switch(botChoice) {
                    case 'r':
                        return msg.reply("lost!");
                    case 'p':
                        return msg.reply("won!");
                    case 's':
                        return msg.reply("tied!");
                }
        }
    }
}
