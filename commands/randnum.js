module.exports = {
    name: 'randnum',
    aliases: ['rand', 'rnum'],
    desc: 'Generates a random number between 2 bounds inclusive',
    syntax: 'randnum [<lower bound> <upper bound> || <upper bound (defaults lower to 1)>]',
    execute(msg, args, client) {
        let min = 1;
        let max;

        if(!args[0])
            return msg.reply("you must specify your bound(s).");

        if((args[1] && !Number(args[1])) || !Number(args[0]))
            return msg.reply("you must enter a valid number!");

        if(!args[1])
            max = Number(args[0]);
        else {
            min = Number(args[0]);
            max = Number(args[1]);
        }

        if(min >= max)
            return msg.reply("max must be greater than min.")

        const rand = Math.floor(Math.random() * (max - min + 1)) + min;

        return msg.reply(`Random number (${min}, ${max}): ${rand}`);
    }
}
