const { Client, Collection } = require("discord.js");
const { readFile, readdirSync } = require("fs");

const { prefix, presence } = require("./_core/config.json");

const client = new Client();
client.commands = new Collection();

const cmdFiles = readdirSync('./commands/').filter(f => f.endsWith('.js'));
cmdFiles.forEach(file => {
    const cmd = require(`./commands/${file}`);
    client.commands.set(cmd.name, cmd);
    if(cmd.aliases != null) cmd.aliases.forEach(alias => {
        client.commands.set(alias, cmd);
    });
});

client.once('ready', () => {
    client.user.setStatus(presence.status);
    client.user.setActivity(presence.activity, { type: presence.activityType });

    console.log(`Loaded ${client.commands.map(c => c).length} commands and aliases.`) 
    console.log('TG-16 is online.')
});

client.on('message', msg => {
    if(msg.channel.type == 'dm') return;

    if(msg.content.startsWith(prefix) && !msg.author.bot) {
        const args = msg.content.slice(prefix.length).split(/ +/);
        const cmd = args.shift().toLowerCase();

        try { client.commands.get(cmd).execute(msg, args, client); }
        catch(e) { return console.log(e); }
    }

    if(msg.content.startsWith(`<@!${client.user.id}>`) && !msg.author.bot) {
        const args = msg.content.split(/ +/).slice(1);
        const cmd = args.shift().toLowerCase();

        try { client.commands.get(cmd).execute(msg, args, client) }
        catch(e) { return; }
    }
});

readFile('./_core/TOKEN', 'utf8', (err, token) => {
    if(err) console.log(err);
    client.login(token);
});
