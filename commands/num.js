const { readFile, writeFileSync, existsSync, mkdir } = require('fs');

module.exports = {
    name: 'num',
    desc: 'Guess the number',
    syntax: 'num <number:1-1000>',
    execute(msg, args, client) {
        if(!args[0]) return msg.reply('you must specify a number!');

        if(!existsSync('./data'))
            mkdir('./data', (err) => { if (err) console.log(err); });

        if(!existsSync('./data/NUM')) {
            let rand = Math.floor(Math.random() * 1000) + 1;
            writeFileSync('./data/NUM', rand.toString(), 'utf8', (err) => { return console.log(err); } );
        }

        readFile('./data/NUM', 'utf8', (err, num) => {
            if(err) console.log(err);

            const number = num.toString();

            if(args[0] == number) {
                let rand = Math.floor(Math.random() * 1000) + 1;
                writeFileSync('./data/NUM', rand.toString(), 'utf8', (err) => { return console.log(err); } );

                msg.reply("correct number. New one has been generated!")
                return msg.react('✅')
            }
            else return msg.react('❌')
        });
    }
}
