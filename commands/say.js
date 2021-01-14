module.exports = {
    name: 'say',
    desc: 'Make TG-16 say something',
    syntax: 'say <message>',
    execute(msg, args, client) {
        msg.delete();

        if(!args[0]) msg.reply(`the syntax is \`\`${this.syntax}\`\``).then(msg => msg.delete({ timeout: 3000 }));
        else {
            const output = args.join(' ');
            msg.channel.send(`**${msg.member.user.username}**\n\n${output}`);
        }
    }
}
