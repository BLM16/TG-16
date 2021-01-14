const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'invite',
    desc: 'Invite TG-16 to a server',
    syntax: 'invite',
    execute(msg, args, client) {
        const invite = new MessageEmbed()
            .setColor('#FBDE71')
            .setAuthor('TG-16', 'https://cdn.discordapp.com/avatars/798906609489281024/678078720e0b0293501ccf19c677f60c.png?size=512')
            .setDescription('Invite TG-16 to your server [here](https://discord.com/oauth2/authorize?client_id=798906609489281024&scope=bot&permissions=8).')
        
        msg.channel.send(invite);
    }
}
