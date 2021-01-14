const { MessageEmbed } = require('discord.js');
const { readdirSync } = require('fs');

module.exports = {
    name: 'help',
    aliases: ['?'],
    desc: 'Shows the help menu',
    syntax: 'help',
    execute(msg, args, client) {
        const cmdFiles = readdirSync('./commands/').filter(f => f.endsWith('.js'));
        
        function makeEmbed(cmd) {
            const helpMenu = new MessageEmbed()
                .setColor('#FBDE71')
                .setTitle(cmd ? `__Help Menu: ${cmd.name}__` : '__Help Menu__')
                .setTimestamp()
                .setFooter('TG-16 Help')

            if(!cmd) {
                cmdFiles.forEach(file => {
                    const c = require(`./${file}`);
                    helpMenu.addField(c.name, c.desc, false);
                });
            } else {
                helpMenu.setDescription(cmd.desc);
                helpMenu.addFields(
                    { name: 'Syntax', value: cmd.syntax, inline: false },
                    { name: 'Aliases', value: cmd.aliases ? cmd.aliases.map(a => `\`${a.toString()}\``).join(', ') : '\`\`None\`\`' }
                );
            }

            return helpMenu;
        }

        if(args[0]) {
            let c = client.commands.get(args[0]);
            if(c) return msg.channel.send(makeEmbed(c));
            else return msg.reply('that command doesn\'t exist.').then(m => m.delete({ timeout: 3000 }));
        } else
            return msg.channel.send(makeEmbed(false));
    }
}