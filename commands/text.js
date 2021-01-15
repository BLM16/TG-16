module.exports = {
    name: 'text',
    aliases: ['txt'],
    desc: 'Manipulate text',
    syntax: 'text <[reverse \\|\\| sort \\|\\| reversesort]> <text>',
    execute(msg, args, client) {
        if(!(args[0] && args[1])) return msg.reply("you must specify an action and the text.");

        if(!['reverse', 'sort', 'reversesort', 'r', 's', 'rs'].includes(args[0]))
            return msg.reply("you must specify a valid action.");

        const text = args.slice(1).join(" ");

        rev = (str) => str.split("").reverse().join("");
        srt = (str) => str.split("").sort().join("");

        if(args[0] == 'reversesort' || args[0] == 'rs') return msg.reply(rev(srt(text)));

        switch(args[0][0]) {
            case 'r':
                return msg.reply(rev(text));
            case 's':
                return msg.reply(srt(text));
        }
    }
}
